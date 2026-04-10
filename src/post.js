/**
 * The post step for the action.
 * This runs after the main action completes, regardless of success or failure.
 */
import * as core from '@actions/core'
import { spawnSync } from 'child_process'
import { DefaultArtifactClient } from '@actions/artifact'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    const jobName = core.getInput('job_name', { required: true })
    const safeJobName = jobName.replace(/["/:<>|*?\\]/g, '-')
    const artifactName = `${safeJobName}-octometrics.monitor.log.jsonl`
    const monitorPath = '/tmp/' + artifactName

    // Check if we're running in a GitHub Actions environment
    const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
    const hasRuntimeToken = !!process.env.ACTIONS_RUNTIME_TOKEN

    if (!isGitHubActions || !hasRuntimeToken) {
      core.info(
        'Not running in GitHub Actions environment or missing required tokens. Skipping artifact upload.'
      )
      return
    }

    // Generate the step summary and PR comment from monitor data
    const binaryPath = core.getState('octometrics_binary_path')
    if (!binaryPath) {
      core.warning(
        'Octometrics binary path not found in state. Skipping report generation.'
      )
    } else {
      try {
        const skipComment = core.getState('octometrics_skip_comment') === 'true'
        core.info('Generating octometrics report...')
        const args = ['report', '-f', monitorPath]
        if (skipComment) {
          args.push('--skip-comment')
        }
        const result = spawnSync(binaryPath, args, {
          env: { ...process.env },
          stdio: 'inherit',
          timeout: 60000
        })
        if (result.error) {
          throw result.error
        }
        if (result.signal) {
          throw new Error(
            `octometrics report killed by signal ${result.signal}`
          )
        }
        if (result.status !== 0) {
          throw new Error(
            `octometrics report exited with code ${result.status}`
          )
        }
        core.info('Octometrics report generated successfully')
      } catch (error) {
        core.warning(`Failed to generate octometrics report: ${error.message}`)
      }
    }

    core.info('Uploading octometrics monitor data...')
    core.info(`Artifact name: ${artifactName}`)

    // Create artifact client
    const artifactClient = new DefaultArtifactClient()

    // Upload the monitor file
    const files = [monitorPath]
    const rootDirectory = '/tmp'
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
