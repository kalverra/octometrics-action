'use strict';

var core = require('@actions/core');
var github = require('@actions/github');
var tc = require('@actions/tool-cache');
var os = require('os');
var path = require('path');
var fs = require('fs');

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
var github__namespace = /*#__PURE__*/_interopNamespaceDefault(github);
var tc__namespace = /*#__PURE__*/_interopNamespaceDefault(tc);
var os__namespace = /*#__PURE__*/_interopNamespaceDefault(os);
var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);
var fs__namespace = /*#__PURE__*/_interopNamespaceDefault(fs);

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const version = core__namespace.getInput('version', { required: false });
    const token = core__namespace.getInput('token', { required: false });

    // Determine OS and architecture
    const platform = os__namespace.platform();
    const arch = os__namespace.arch();

    // Map platform and arch to GitHub release asset names
    const platformMap = {
      darwin: 'darwin',
      linux: 'linux',
      win32: 'windows'
    };

    const archMap = {
      x64: 'amd64',
      arm64: 'arm64'
    };

    const platformName = platformMap[platform];
    const archName = archMap[arch];

    if (!platformName || !archName) {
      throw new Error(
        `Unsupported platform (${platform}) or architecture (${arch})`
      )
    }

    // Construct the asset name
    const assetName = `octometrics_${platformName}_${archName}${platform === 'win32' ? '.exe' : ''}`;

    // Get the latest release if no version is specified
    const octokit = github__namespace.getOctokit(token || process.env.GITHUB_TOKEN);
    const release = version
      ? await octokit.rest.repos.getReleaseByTag({
          owner: 'kalverra',
          repo: 'octometrics',
          tag: version
        })
      : await octokit.rest.repos.getLatestRelease({
          owner: 'kalverra',
          repo: 'octometrics'
        });

    // Find the matching asset
    const asset = release.data.assets.find((a) => a.name === assetName);
    if (!asset) {
      throw new Error(
        `Could not find asset ${assetName} in release ${release.data.tag_name}`
      )
    }

    // Download the asset
    core__namespace.info(
      `Downloading ${assetName} from release ${release.data.tag_name}...`
    );
    const downloadPath = await tc__namespace.downloadTool(asset.browser_download_url);

    // Make it executable (except on Windows)
    if (platform !== 'win32') {
      fs__namespace.chmodSync(downloadPath, '755');
    }

    // Add to PATH
    const toolPath = path__namespace.dirname(downloadPath);
    core__namespace.addPath(toolPath);

    core__namespace.info(
      `Successfully installed octometrics ${release.data.tag_name} for ${platformName}/${archName} at ${downloadPath}`
    );
    core__namespace.setOutput('version', release.data.tag_name);
    core__namespace.setOutput('path', downloadPath);

    // Run the octometrics binary
    const result = await exec(
      `${downloadPath} monitor -o octometrics.monitor.json`
    );
    core__namespace.info(`Octometrics binary returned: ${result.stdout}`);
  } catch (error) {
    // Fail the workflow step if an error occurs
    core__namespace.setFailed(error.message);
  }
}

run();

exports.run = run;
