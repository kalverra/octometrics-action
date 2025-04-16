/**
 * The post step for the action.
 * This runs after the main action completes, regardless of success or failure.
 */
import * as core from '@actions/core'
import { DefaultArtifactClient } from '@actions/artifact'

const artifactName = `${process.env.GITHUB_JOB}-octometrics.monitor.json`
const monitorPath = '/tmp/' + artifactName

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    // Check if we're running in a GitHub Actions environment
    const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
    const hasRuntimeToken = !!process.env.ACTIONS_RUNTIME_TOKEN

    if (!isGitHubActions || !hasRuntimeToken) {
      core.info(
        'Not running in GitHub Actions environment or missing required tokens. Skipping artifact upload.'
      )
      return
    }

    core.info('Uploading octometrics monitor data...')

    // Create artifact client
    const artifactClient = new DefaultArtifactClient()

    // Upload the monitor file
    const files = [monitorPath]
    const rootDirectory = process.cwd()
    const options = {
      continueOnError: true
    }

    const uploadResponse = await artifactClient.uploadArtifact(
      artifactName,
      files,
      rootDirectory,
      options
    )
  } catch (error) {
    // Log the error but don't fail the workflow
    core.warning(`Failed to upload artifacts: ${error.message}`)
  }
}

// Run the post step
run()
