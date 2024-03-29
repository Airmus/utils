'use strict'

module.exports = {
  extends: ['@airmus'],

  rules: {
    'spaced-comment': 0,
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-lonely-if': 0,
    'react/no-array-index-key': 0,
    'react-hooks/exhaustive-deps': 0,
    'no-else-return': 0,
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
    ],
  },
}
