import * as core from '@actions/core'
import * as github from '@actions/github'
import * as tc from '@actions/tool-cache'
import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'
import { spawn } from 'child_process'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    const version = core.getInput('version', { required: false })

    // Determine OS and architecture
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
    const binaryPath = path.join(binaryDir, 'octometrics')
    core.info(`Unzipped ${compressedBinaryName} to ${binaryPath}`)

    // Make it executable (except on Windows)
    if (platform !== 'win32') {
      fs.chmodSync(binaryPath, '755')
    }

    // Add to PATH
    const toolPath = path.dirname(binaryPath)
    core.addPath(toolPath)

    core.info(
      `Successfully installed octometrics ${release.data.tag_name} for ${platformName}/${archName} at ${binaryPath}`
    )
    core.setOutput('version', release.data.tag_name)
    core.setOutput('path', binaryPath)

    core.info('Running octometrics monitor...')
    // Run the octometrics binary
    const child = spawn(`${binaryPath} monitor -o octometrics.monitor.json`)
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`)
    })

    child.on('close', (code) => {
      console.log(`Process exited with code ${code}`)
    })
  } catch (error) {
    // Fail the workflow step if an error occurs
    core.setFailed(error.message)
  }
}

run()
