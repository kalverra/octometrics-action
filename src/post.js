/**
 * The post step for the action.
 * This runs after the main action completes, regardless of success or failure.
 */
import * as core from '@actions/core'
import * as artifact from '@actions/artifact'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    core.info('Running post step...')

    // Create artifact client
    const artifactClient = artifact.create()

    // Upload the monitor file
    const artifactName = 'octometrics.monitor.json'
    const files = ['octometrics.monitor.json']
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

    core.info(
      `Uploaded artifact ${artifactName} with ID ${uploadResponse.artifactItems.length} items`
    )
  } catch (error) {
    // Fail the workflow step if an error occurs
    core.setFailed(error.message)
  }
}

// Run the post step
run()
