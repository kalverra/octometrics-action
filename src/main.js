import * as core from '@actions/core'
import * as github from '@actions/github'
import * as tc from '@actions/tool-cache'
import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    const version = core.getInput('version', { required: false })
    const token = core.getInput('token', { required: false })

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
    const assetName = `octometrics_${platformName}_${archName}${platform === 'win32' ? '.exe' : ''}`

    // Get the latest release if no version is specified
    const octokit = github.getOctokit(token || process.env.GITHUB_TOKEN)
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

    // Find the matching asset
    const asset = release.data.assets.find((a) => a.name === assetName)
    if (!asset) {
      throw new Error(
        `Could not find asset ${assetName} in release ${release.data.tag_name}`
      )
    }

    // Download the asset
    core.info(
      `Downloading ${assetName} from release ${release.data.tag_name}...`
    )
    const downloadPath = await tc.downloadTool(asset.browser_download_url)

    // Make it executable (except on Windows)
    if (platform !== 'win32') {
      fs.chmodSync(downloadPath, '755')
    }

    // Add to PATH
    const toolPath = path.dirname(downloadPath)
    core.addPath(toolPath)

    core.info(
      `Successfully installed octometrics ${release.data.tag_name} for ${platformName}/${archName} at ${downloadPath}`
    )
    core.setOutput('version', release.data.tag_name)
    core.setOutput('path', downloadPath)

    // Run the octometrics binary
    const result = await exec(
      `${downloadPath} monitor -o octometrics.monitor.json`
    )
    core.info(`Octometrics binary returned: ${result.stdout}`)
  } catch (error) {
    // Fail the workflow step if an error occurs
    core.setFailed(error.message)
  }
}

run()
