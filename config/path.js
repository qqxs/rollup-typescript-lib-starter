const path = require('path')

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

export { resolveFile }
