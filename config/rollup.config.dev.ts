import serve from 'rollup-plugin-serve'
import configList from './rollup.config'
import { resolveFile } from './path'

const PORT = 3000

configList.map((config, index) => {
  if (index === 0) {
    config.plugins = [
      ...config.plugins,
      ...[
        serve({
          port: PORT,
          contentBase: [resolveFile('example'), resolveFile('dist')]
        })
      ]
    ]
  }

  return config
})

module.exports = configList
