import strip from '@rollup/plugin-strip';
import configList from './rollup.config';

configList.map((config) => {
  config.plugins = [
    ...config.plugins,
    ...[
      strip({
        include: ['src/**/*.(js|ts)'],
        exclude: [
          // 忽略这个文件
          'src/utils/logger.ts',
        ],
        debugger: true,
      }),
    ],
  ];
  return config;
});

module.exports = configList;
