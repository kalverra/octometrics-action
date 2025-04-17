import * as core from '@actions/core'
import * as github from '@actions/github'
import * as tc from '@actions/tool-cache'
import jwt_decode from 'jwt-decode'
import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'
import { spawn } from 'child_process'

const artifactName = `${process.env.GITHUB_JOB}-octometrics.monitor.log`
const monitorPath = '/tmp/' + artifactName

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    const platform = os.platform()
    const arch = os.arch()

    var version = core.getInput('version', { required: false })
    if (!version) {
      version = 'latest'
    }

    var interval = core.getInput('interval', { required: false })
    if (!interval) {
      interval = '1s'
    }

    var releaseBinaryPath = ''

    // Check if version is a release format (vX.X.X or 'latest')
    const isRelease = version === 'latest' || /^v\d+\.\d+\.\d+$/.test(version)

    if (!isRelease) {
      // Treat version as local binary path
      core.info(`Using local binary at ${version}`)
      if (!fs.existsSync(version)) {
        throw new Error(`Local binary not found at ${version}`)
      }
      releaseBinaryPath = version
    } else {
      // Default behavior: download from release

      // Map platform and arch to GitHub release asset names
      const platformMap = {
        darwin: 'darwin',
        linux: 'linux',
        win32: 'windows'
      }

      const archMap = {
        x64: 'amd64',
        arm64: 'arm64'
      }

      const platformName = platformMap[platform]
      const archName = archMap[arch]

      if (!platformName || !archName) {
        throw new Error(
          `Unsupported platform (${platform}) or architecture (${arch})`
        )
      }

      core.info(`DEBUG: Getting token name`)
      const token = getRuntimeToken()

      const decoded = jwt_decode(token)
      core.info(`DEBUG: Decoded token: ${JSON.stringify(decoded)}`)
      if (!decoded.scp) {
        throw new Error('Invalid JWT token')
      }
      const scpParts = decoded.scp.split(' ')
      if (scpParts.length === 0) {
        throw new Error('Invalid JWT token')
      }

      for (const scopes of scpParts) {
        const scopeParts = scopes.split(':')
        if (scopeParts?.[0] !== 'Actions.Results') {
          // not the Actions.Results scope
          continue
        }

        /*
         * example scopeParts:
         * ["Actions.Results", "ce7f54c7-61c7-4aae-887f-30da475f5f1a", "ca395085-040a-526b-2ce8-bdc85f692774"]
         */
        if (scopeParts.length !== 3) {
          // missing expected number of claims
          throw new Error('Invalid JWT token: expected 3 claims')
        }

        const ids = {
          workflowRunBackendId: scopeParts[1],
          workflowJobRunBackendId: scopeParts[2]
        }

        core.info(`Workflow Run Backend ID: ${ids.workflowRunBackendId}`)
        core.info(`Workflow Job Run Backend ID: ${ids.workflowJobRunBackendId}`)
      }

      // Construct the asset name
      const compressedBinaryName = `octometrics_${platformName}_${archName}${platform === 'win32' ? '.zip' : '.tar.gz'}`

      // Get the latest release if no version is specified
      const octokit = github.getOctokit(process.env.GITHUB_TOKEN)
      core.info(`Getting release for version ${version}`)
      const release =
        version === 'latest'
          ? await octokit.rest.repos.getLatestRelease({
              owner: 'kalverra',
              repo: 'octometrics'
            })
          : await octokit.rest.repos.getReleaseByTag({
              owner: 'kalverra',
              repo: 'octometrics',
              tag: version
            })

      // Find the matching compressed asset
      const compressedAsset = release.data.assets.find(
        (a) => a.name === compressedBinaryName
      )
      if (!compressedAsset) {
        throw new Error(
          `Could not find asset ${compressedBinaryName} in release ${release.data.tag_name}`
        )
      }

      // Download the compressed binary
      core.info(
        `Downloading ${compressedBinaryName} from release ${release.data.tag_name}...`
      )
      const compressedBinaryPath = await tc.downloadTool(
        compressedAsset.browser_download_url
      )
      core.info(`Downloaded ${compressedBinaryName} to ${compressedBinaryPath}`)

      // Unzip the compressed binary
      core.info(`Unzipping ${compressedBinaryName}...`)
      const binaryDir = await tc.extractTar(
        compressedBinaryPath,
        `octometrics_${platformName}_${archName}`
      )
      releaseBinaryPath = path.join(binaryDir, 'octometrics')
      core.info(`Unzipped ${compressedBinaryName} to ${releaseBinaryPath}`)
      core.info(
        `Successfully installed octometrics ${release.data.tag_name} for ${platformName}/${archName} at ${releaseBinaryPath}`
      )
      core.setOutput('version', release.data.tag_name)
    }

    // Make it executable (except on Windows)
    if (platform !== 'win32') {
      fs.chmodSync(releaseBinaryPath, '755')
    }

    // Add to PATH
    const toolPath = path.dirname(releaseBinaryPath)
    core.addPath(toolPath)

    core.setOutput('path', releaseBinaryPath)
    core.info('Running octometrics monitor...')
    core.info(
      `Running command: ${releaseBinaryPath} monitor -o ${monitorPath} -i ${interval}`
    )
    // Run the octometrics binary with proper command separation
    const child = spawn(
      releaseBinaryPath,
      ['monitor', '-o', monitorPath, '-i', interval],
      {
        detached: true,
        stdio: 'ignore',
        env: {
          ...process.env
        }
      }
    )

    child.unref()

    core.saveState('octometrics_monitor_pid', child.pid?.toString())
    core.info('Octometrics monitor started')
  } catch (error) {
    // Fail the workflow step if an error occurs
    core.setFailed(error.message)
  }
}

// https://github.com/actions/toolkit/blob/main/packages/artifact/src/internal/shared/config.ts#L10
export function getRuntimeToken() {
  const token = process.env['ACTIONS_RUNTIME_TOKEN']
  if (!token) {
    throw new Error('Unable to get the ACTIONS_RUNTIME_TOKEN env variable')
  }
  return token
}

// https://github.com/actions/toolkit/blob/1b1e81526b802d1d641911393281c2fb45ed5f11/packages/artifact/src/internal/shared/util.ts#L20

run()
