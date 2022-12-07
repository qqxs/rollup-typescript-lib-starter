module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  env: {
    //指定代码的运行环境
    browser: true,
    node: true
  },
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-delimiter-style': 'off'
  }
}
