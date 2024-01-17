module.exports = {
  entryPoints: ['src/index.ts'],
  out: 'docs',
  plugin: ['typedoc-plugin-rename-defaults'],
  exclude: ['node_modules'],
  includeVersion: true,
  hideGenerator: true,
  disableSources: false,
  tsconfig: 'tsconfig.json',
  readme: 'README.md',
};
