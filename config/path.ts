import path from 'path';

/**
 * @description 解决文件路径
 * @param {string} filePath 文件路径
 * @returns {string} string path
 */
function resolveFile(filePath: string) {
  return path.join(__dirname, '..', filePath);
}

export { resolveFile };
