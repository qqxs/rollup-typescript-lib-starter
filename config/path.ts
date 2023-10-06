import path from 'node:path';

/**
 * @description 解决文件路径
 * @param {string} filePath
 * @returns {string} string path
 */
function resolveFile(filePath: string) {
  return path.join(__dirname, '..', filePath);
}

export { resolveFile };
