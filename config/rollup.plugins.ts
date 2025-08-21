import { type Plugin } from 'rollup';
// Convert CommonJS modules to ES6
import commonjs from '@rollup/plugin-commonjs';
// so Rollup can find `rxjs`. lib
import resolve from '@rollup/plugin-node-resolve';
// import eslint from '@rollup/plugin-eslint';
import swc from '@rollup/plugin-swc';
// node >= 10.16.0
import filesize from 'rollup-plugin-filesize';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

import pkg from '../package.json';
import { isDev } from './env';

export default (props: any) =>
  [
    // eslint({
    //   // ESLint 9 配置
    //   // eslintPath: require.resolve('eslint'),
    //   // 指定要检查的文件
    //   include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
    //   // 排除的文件
    //   exclude: ['node_modules/**', 'dist/**', '**/__tests__/**'],
    //   // 抛出错误时是否停止构建
    //   throwOnError: true,
    //   // 抛出警告时是否停止构建
    //   throwOnWarning: false,
    //   // 格式化错误消息
    //   formatter: 'stylish',
    //   // 自定义配置（可选）
    //   // config: {
    //   //   useEslintrc: false, // 不使用 .eslintrc
    //   //   overrideConfigFile: 'eslint.config.js', // 使用 ESLint 9 配置
    //   // },
    // }),
    swc({
      // https://swc.rs/docs/configuration/swcrc
      swc: {
        jsc: {
          target: props.target,
        },
      },
      include: ['**/config/**/*.{ts,js}', '**/src/**/*.{ts,js}'],
    }),
    resolve(),
    commonjs({ extensions: ['.js', '.ts'] }),
    replace({
      __VERSION__: pkg.version,
      preventAssignment: true,
    }),
    postcss({
      plugins: [autoprefixer(), cssnano({ preset: 'default' })],
      sourceMap: isDev,
      extract: false,
    }),
    !isDev && filesize(),
  ] as Plugin[];
