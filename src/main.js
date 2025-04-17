import * as core from '@actions/core'
import * as github from '@actions/github'
import * as tc from '@actions/tool-cache'
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

    core.info(
      `DEBUG: All environment variables: ${JSON.stringify(process.env)}`
    )

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

run()
