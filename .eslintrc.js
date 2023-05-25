module.exports = {
  extends: 'xx',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json', 'tsconfig.node.json', 'jest.config.ts', 'vite.config.ts'],
  },
  rules: {
    // '@typescript-eslint/no-explicit-any': ['off'],
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/member-delimiter-style': 'off'
    'no-unused-vars': 'off',
  },
};
