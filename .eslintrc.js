require('@babel/register');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    babelOptions: {
      plugins: [
        '@babel/plugin-proposal-class-properties',
      ],
    },
  },
  plugins: [
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',
  ],
  rules: {
    'default-param-last': 0,
    'max-len': [2, 120, 2],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 5 }],
    'object-curly-newline': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'react/function-component-definition': 0,
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
    'react/jsx-props-no-spreading': 0,
  },
};
