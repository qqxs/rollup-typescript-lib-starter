import { type Plugin } from 'rollup';
// Convert CommonJS modules to ES6
import commonjs from '@rollup/plugin-commonjs';
// so Rollup can find `rxjs`. lib
import resolve from '@rollup/plugin-node-resolve';
import eslint from '@rollup/plugin-eslint';
import swc from '@rollup/plugin-swc';
// node >= 10.16.0
import filesize from 'rollup-plugin-filesize';
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import pkg from '../package.json';
import { isDev } from './env';

export default [
  eslint({
    throwOnError: true, // lint 结果有错误将会抛出异常
    throwOnWarning: true,
    include: ['src/**/*.ts', 'src/**/*.js'],
    exclude: ['node_modules/**', '**/__tests__/**'],
  }),
  swc({
    // https://swc.rs/docs/configuration/swcrc
    swc: {
      jsc: {
        target: isDev ? 'es2015' : 'es5',
      },
    },
    include: ['**/config/**/*.{ts,js}', '**/src/**/*.{ts,js}'],
  }),
  resolve(),
  commonjs({ extensions: ['.js', '.ts'] }),
  replace({
    __VERSION__: pkg.version,
  }),
  scss({
    fileName: 'index.css',
  }),
  postcss({
    plugins: [autoprefixer(), cssnano()],
    sourceMap: isDev,
  }),
  !isDev && filesize(),
] as Plugin[];
