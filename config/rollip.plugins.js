import typescript from '@rollup/plugin-typescript'
// Convert CommonJS modules to ES6
import commonjs from '@rollup/plugin-commonjs'
// A Rollup which converts ES2015+ code with the Bublé compiler.
import buble from '@rollup/plugin-buble'
// babel
import babel from 'rollup-plugin-babel'
//
// import resolve from "@rollup/plugin-node-resolve";

// node >= 10.16.0
// import filesize from "rollup-plugin-filesize";

export default [
  typescript({
    exclude: ['**/__tests__/**'],
    include: ['**/src/**']
  }),
  buble({
    include: ['**/src/**']
  }),
  commonjs({ extensions: ['.js', '.ts'] }),
  babel()
  //   filesize()
]
