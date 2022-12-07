import typescript from '@rollup/plugin-typescript'
// Convert CommonJS modules to ES6
import commonjs from '@rollup/plugin-commonjs'
// A Rollup which converts ES2015+ code with the Bublé compiler.
import buble from '@rollup/plugin-buble'
// babel
// import babel from 'rollup-plugin-babel'
import { babel } from '@rollup/plugin-babel'
// so Rollup can find `rxjs`. lib
import resolve from '@rollup/plugin-node-resolve'
import { eslint } from 'rollup-plugin-eslint'

// node >= 10.16.0
import filesize from 'rollup-plugin-filesize'

import isDev from './isDev'

export default [
  eslint({
    throwOnError: true, // lint 结果有错误将会抛出异常
    throwOnWarning: true,
    include: ['src/**/*.ts', 'src/**/*.js'],
    exclude: ['node_modules/**']
  }),
  typescript({
    exclude: ['**/__tests__/**'],
    include: ['**/src/**']
  }),
  buble({
    include: ['**/src/**']
  }),
  resolve(),
  commonjs({ extensions: ['.js', '.ts'] }),
  babel({ babelHelpers: 'bundled' }),
  !isDev && filesize()
]
