## typescript-lib-starter

![build](https://github.com/qqxs/rollup-typescript-lib-starter/workflows/build/badge.svg)

<!-- ![Version](https://img.shields.io/npm/v/rollup-typescript-lib-starter.svg)
![License](https://img.shields.io/npm/l/rollup-typescript-lib-starter.svg) -->

用来开发前端库，支持 Typescript/Javascript。

### Usage

```sh
# install
yarn install

# development
yarn run dev

# build dist and api document
yarn run build

# api document
yarn run docs

# test
yarn run test
```

### Logger

[Logger](./src/utils/logger.ts) 用来打印日志，其他文件中`console`在构建生产环境时移除， 只有[Logger](./src/utils/logger.ts)中日志打印才可以生效。
