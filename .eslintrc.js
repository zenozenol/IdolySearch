module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
        "plugin:@typescript-eslint/eslint-recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "parser": "@typescript-eslint/parser",
        "sourceType": "module",
        "singleQuote": true,
        "semi": false
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
      "semi": ['error', 'always'],
      'semi-spacing': ['error', { "after": true, "before": false }],
      'semi-style': ['error', 'last'],
      'no-extra-semi': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error'
    }
};