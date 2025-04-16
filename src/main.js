import * as core from '@actions/core'
import * as github from '@actions/github'
import * as tc from '@actions/tool-cache'
import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'
import { spawn } from 'child_process'

const artifactName = `${process.env.GITHUB_JOB}-octometrics.monitor.json`
var monitorPath = '/tmp/' + artifactName

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    const version = core.getInput('version', { required: false })
    const binarySource = core.getInput('binary-source', { required: false }) // 'release', 'artifact', or 'local'
    const binaryPath = core.getInput('binary-path', { required: false }) // Path to binary or artifact name

    // If binary-source is 'local', use the provided path directly
    if (binarySource === 'local' && binaryPath) {
      core.info(`Using local binary at ${binaryPath}`)
      if (!fs.existsSync(binaryPath)) {
        throw new Error(`Local binary not found at ${binaryPath}`)
      }
      // Make it executable (except on Windows)
      if (os.platform() !== 'win32') {
        fs.chmodSync(binaryPath, '755')
      }
      core.addPath(path.dirname(binaryPath))
      core.setOutput('version', 'local')
      core.setOutput('path', binaryPath)
      return
    }

    // If binary-source is 'artifact', download from GitHub artifacts
    if (binarySource === 'artifact' && binaryPath) {
      core.info(`Downloading binary from artifact: ${binaryPath}`)
      const octokit = github.getOctokit(process.env.GITHUB_TOKEN)
      const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')

      // Get the artifact
      const { data: artifacts } =
        await octokit.rest.actions.listArtifactsForRepo({
          owner,
          repo,
          name: binaryPath
        })

      if (artifacts.length === 0) {
        throw new Error(`Artifact ${binaryPath} not found`)
      }

      const artifact = artifacts[0]
      const downloadUrl = await octokit.rest.actions.downloadArtifact({
        owner,
        repo,
        artifact_id: artifact.id,
        archive_format: 'zip'
      })

      const artifactPath = await tc.downloadTool(downloadUrl.url)
      const extractedPath = await tc.extractZip(artifactPath)
      const extractedBinaryPath = path.join(extractedPath, 'octometrics')

      if (!fs.existsSync(extractedBinaryPath)) {
        throw new Error(`Binary not found in artifact ${binaryPath}`)
      }

      // Make it executable (except on Windows)
      if (os.platform() !== 'win32') {
        fs.chmodSync(extractedBinaryPath, '755')
      }

      core.addPath(path.dirname(extractedBinaryPath))
      core.setOutput('version', 'artifact')
      core.setOutput('path', extractedBinaryPath)
      return
    }

    // Default behavior: download from release
    const platform = os.platform()
    const arch = os.arch()

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
    const release = version
      ? await octokit.rest.repos.getReleaseByTag({
          owner: 'kalverra',
          repo: 'octometrics',
          tag: version
        })
      : await octokit.rest.repos.getLatestRelease({
          owner: 'kalverra',
          repo: 'octometrics'
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
    const releaseBinaryPath = path.join(binaryDir, 'octometrics')
    core.info(`Unzipped ${compressedBinaryName} to ${releaseBinaryPath}`)

    // Make it executable (except on Windows)
    if (platform !== 'win32') {
      fs.chmodSync(releaseBinaryPath, '755')
    }

    // Add to PATH
    const toolPath = path.dirname(releaseBinaryPath)
    core.addPath(toolPath)

    core.info(
      `Successfully installed octometrics ${release.data.tag_name} for ${platformName}/${archName} at ${releaseBinaryPath}`
    )
    core.setOutput('version', release.data.tag_name)
    core.setOutput('path', releaseBinaryPath)

    core.info('Running octometrics monitor...')
    // Run the octometrics binary with proper command separation
    const child = spawn(releaseBinaryPath, ['monitor', '-o', monitorPath], {
      detached: true,
      stdio: 'ignore',
      env: {
        ...process.env
      }
    })

    child.unref()

    core.saveState('octometrics_monitor_pid', child.pid?.toString())
    core.info('Octometrics monitor started')
  } catch (error) {
    // Fail the workflow step if an error occurs
    core.setFailed(error.message)
  }
}

run()
