/**
 * The post step for the action.
 * This runs after the main action completes, regardless of success or failure.
 */
import * as core from '@actions/core'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    core.info('Running post step...')
  } catch (error) {
    // Fail the workflow step if an error occurs
    core.setFailed(error.message)
  }
}

// Run the post step
run()
