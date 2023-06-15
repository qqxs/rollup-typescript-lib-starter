import configList from './rollup.config';
import strip from '@rollup/plugin-strip';

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
