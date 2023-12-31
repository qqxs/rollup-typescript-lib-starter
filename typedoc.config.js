module.exports = {
  entryPoints: ['src/index.ts'],
  out: 'docs',
  exclude: ['node_modules'],
  includeVersion: true,
  hideGenerator: true,
  disableSources: true,
  tsconfig: 'tsconfig.json',
  readme: 'README.md',
};
