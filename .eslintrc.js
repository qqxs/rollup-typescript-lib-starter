module.exports = {
  extends: 'xx',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json', 'tsconfig.node.json'],
  },
  rules: {
    // '@typescript-eslint/no-explicit-any': ['off'],
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/member-delimiter-style': 'off'
    'no-unused-vars': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
  },
};
