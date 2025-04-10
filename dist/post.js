'use strict';

var core = require('@actions/core');
var artifact = require('@actions/artifact');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var core__namespace = /*#__PURE__*/_interopNamespaceDefault(core);
var artifact__namespace = /*#__PURE__*/_interopNamespaceDefault(artifact);

/**
 * The post step for the action.
 * This runs after the main action completes, regardless of success or failure.
 */

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    core__namespace.info('Running post step...');

    // Create artifact client
    const artifactClient = artifact__namespace.create();

    // Upload the monitor file
    const artifactName = 'octometrics.monitor.json';
    const files = ['octometrics.monitor.json'];
    const rootDirectory = process.cwd();
    const options = {
      continueOnError: true
    };

    const uploadResponse = await artifactClient.uploadArtifact(
      artifactName,
      files,
      rootDirectory,
      options
    );

    core__namespace.info(
      `Uploaded artifact ${artifactName} with ID ${uploadResponse.artifactItems.length} items`
    );
  } catch (error) {
    // Fail the workflow step if an error occurs
    core__namespace.setFailed(error.message);
  }
}

// Run the post step
run();

exports.run = run;
