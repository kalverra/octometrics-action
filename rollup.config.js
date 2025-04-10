// See: https://rollupjs.org/introduction/

import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

const config = {
  input: {
    main: 'src/main.js',
    post: 'src/post.js'
  },
  output: {
    esModule: true,
    dir: 'dist',
    format: 'es',
    sourcemap: false
  },
  plugins: [commonjs(), json(), nodeResolve({ preferBuiltins: true })]
}

export default config
