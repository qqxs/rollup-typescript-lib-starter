import configList from './rollup.config'

configList.map((config, index) => {
  config.plugins = [...config.plugins, ...[]]
  return config
})

module.exports = configList
