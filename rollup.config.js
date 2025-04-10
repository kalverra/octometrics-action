// See: https://rollupjs.org/introduction/

import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: ['src/main.js', 'src/post.js'],
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'named'
  },
  external: [
    '@actions/core',
    '@actions/github',
    '@actions/tool-cache',
    '@actions/artifact',
    'os',
    'path',
    'fs',
    'child_process'
  ],
  plugins: [json(), nodeResolve(), commonjs()]
}
