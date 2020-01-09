import { uglify } from 'rollup-plugin-uglify'
import rollupPlugins from './rollip.plugins'

const pkg = require('../package.json')

const banner = `/*
* ${pkg.outputName}.js v${pkg.version}
* (c) 2018-${new Date().getFullYear()} ShineShao
* Released under the MIT License.
*/`

const isDev = process.env.NODE_ENV === 'development'

export default [
  {
    input: 'src/index.ts',
    output: [
      //   {
      //     // 浏览器端的模块规范, 可通过 RequireJS 可加载
      //     // https://github.com/amdjs/amdjs-api/blob/master/AMD.md
      //     // https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88)
      //     file: pkg.amd,
      //     format: 'amd',
      //     sourcemap: isDev,
      //     banner,
      //     extends: ['lib/hello', 'lodash']
      //   },
      {
        // Node 默认的模块规范, 可通过 Webpack 加载
        // https://javascript.ruanyifeng.com/nodejs/module.html
        // https://zh.wikipedia.org/wiki/CommonJS
        file: pkg.cjs,
        format: 'cjs',
        sourcemap: isDev,
        banner
      },
      {
        // ES2015 Module 规范,
        // https://exploringjs.com/es6/ch_modules.html
        file: pkg.esm,
        format: 'esm',
        sourcemap: isDev,
        banner
      },
      {
        //自执行函数, 可通过 <script> 标签加载
        // https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F
        file: pkg.iife,
        format: 'iife',
        sourcemap: isDev,
        name: pkg.outputName,
        banner
      },
      {
        //   UMD (Universal Module Definition), 希望提供一个前后端跨平台的解决方案(支持AMD与CommonJS模块方式),。
        //   https://github.com/umdjs/umd
        // https://leohxj.gitbooks.io/front-end-database/javascript-modules/about-umd.html
        file: pkg.umd,
        format: 'umd',
        name: pkg.outputName,
        sourcemap: isDev,
        banner
      }
    ],
    plugins: [...rollupPlugins]
  },
  //   {
  //     input: 'src/lib/hello.ts',
  //     output: {
  //       file: 'dist/lib/hello.js',
  //       format: 'amd',
  //       amd: {
  //         id: 'lib/hello'
  //       }
  //     },
  //     plugins: [...rollupPlugins]
  //   },
  {
    input: 'src/index.ts',
    output: [
      // umd with compress version
      {
        file: pkg.umdMin,
        format: 'umd',
        name: pkg.name,
        banner
      }
    ],
    plugins: [
      ...rollupPlugins,
      ...[
        uglify({
          compress: {
            drop_console: true
          }
        })
      ]
    ]
  }
]
