import { upperCamel } from '@skax/camel';
import { type MergedRollupOptions } from 'rollup';
// minify the Rollup bundle
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import { dts } from 'rollup-plugin-dts';
import dayjs from 'dayjs';
// rollup common plugin
import rollupPlugins from './rollup.plugins';
import { isDev, isAnalyzer } from './env';
import pkg from '../package.json';

// 大驼峰命名
const name = upperCamel(pkg.name, '-');

const input = 'src/index.ts';

// prettier-ignore
const banner = `/*
*
* ${pkg.name} v${pkg.version}
* Copyright (c) ${dayjs().format("YYYY-MM-DD")} ${pkg.author}
* Released under the MIT License.
*
*/`;

const sourcemap = isDev;

const UMD = {
  input,
  output: [
    {
      /**
       * UMD (Universal Module Definition), 希望提供一个前后端跨平台的解决方案(支持AMD与CommonJS模块方式),。
       * https://github.com/umdjs/umd
       * https://leohxj.gitbooks.io/front-end-database/javascript-modules/about-umd.html
       */
      file: pkg.umd,
      format: 'umd',
      name,
      sourcemap,
      banner,
    },
  ],
  plugins: [...rollupPlugins({ target: 'es5' })],
};

// ts types
const dtsConfig = {
  input,
  output: [{ file: 'dist/types/index.d.ts', format: 'es' }],
  external: [/\.s[ac]ss$|\.css$|\.less/], // ignore .scss .sass .css .less file
  plugins: [dts()],
};

export default isDev
  ? [UMD]
  : ([
      pkg.main
        ? {
            input,
            output: [
              // {
              //   // 浏览器端的模块规范, 可通过 RequireJS 可加载
              //   // https://github.com/amdjs/amdjs-api/blob/master/AMD.md
              //   // https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88)
              //   file: pkg.amd,
              //   format: 'amd',
              //   sourcemap,
              //   banner,
              //   extends: ['lib/hello', 'lodash']
              // },
              {
                exports: 'auto',
                // Node 默认的模块规范, 可通过 Webpack 加载
                // https://javascript.ruanyifeng.com/nodejs/module.html
                // https://zh.wikipedia.org/wiki/CommonJS
                file: pkg.main,
                format: 'cjs',
                sourcemap,
                banner,
              },
              // {
              //   // 自执行函数, 可通过 <script> 标签加载
              //   // https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F
              //   file: pkg.iife,
              //   format: 'iife',
              //   sourcemap: isDev,
              //   name,
              //   banner,
              // },
            ],
            plugins: [...rollupPlugins({ target: 'es5' })],
            // external: ['rxjs'] // 如果你不想第三方库被打包进来，而可以在外面引入，配合使用的话，可以在rollup.config.js中配置external
          }
        : null,
      pkg.module
        ? {
            input,
            output: [
              {
                // ES2015 Module 规范,
                // https://exploringjs.com/es6/ch_modules.html
                exports: 'auto',
                file: pkg.module,
                format: 'esm',
                sourcemap,
                banner,
              },
            ],
            plugins: [...rollupPlugins({ target: 'es2015' })],
            // external: ['rxjs'] // 如果你不想第三方库被打包进来，而可以在外面引入，配合使用的话，可以在rollup.config.js中配置external
          }
        : null,
      pkg.umd ? { ...UMD } : null,
      pkg.umdMin
        ? {
            input,
            output: [
              // umd with compress version
              {
                file: pkg.umdMin,
                format: 'umd',
                name,
                sourcemap,
                banner,
              },
            ],
            plugins: [
              ...rollupPlugins({ target: 'es5' }),
              ...[terser(), isAnalyzer ? visualizer() : null].filter((plugin) => plugin !== null),
            ],
            // external: ['rxjs'] // 如果你不想第三方库被打包进来，而可以在外面引入，配合使用的话，可以在rollup.config.js中配置external
          }
        : null,
      dtsConfig,
    ].filter((config) => config !== null) as MergedRollupOptions[]);
