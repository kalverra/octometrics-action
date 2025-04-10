import { c as coreExports } from './core-D1vDSATZ.js';
import 'os';
import 'crypto';
import 'fs';
import 'path';
import 'http';
import 'https';
import 'net';
import 'tls';
import 'events';
import 'assert';
import 'util';
import 'stream';
import 'buffer';
import 'querystring';
import 'stream/web';
import 'node:stream';
import 'node:util';
import 'node:events';
import 'worker_threads';
import 'perf_hooks';
import 'util/types';
import 'async_hooks';
import 'console';
import 'url';
import 'zlib';
import 'string_decoder';
import 'diagnostics_channel';
import 'child_process';
import 'timers';

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
    coreExports.info('Running post step...');
  } catch (error) {
    // Fail the workflow step if an error occurs
    coreExports.setFailed(error.message);
  }
}

// Run the post step
run();

export { run };
