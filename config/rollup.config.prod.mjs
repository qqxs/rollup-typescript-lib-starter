import configList from './rollup.config';

configList.map((config) => {
  config.plugins = [...config.plugins, ...[]];
  return config;
});

module.exports = configList;
