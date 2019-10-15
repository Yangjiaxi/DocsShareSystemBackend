module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all"
      }
    ],
    "quotes": ['error', 'double'],
    "no-console": 0,
    "no-global-assign": 0,
    "import/prefer-default-export": 0,
    "import/order": 0,
    "new-cap": 0,
    "no-await-in-loop": 0,
    "no-plusplus": 0,
    "object-curly-newline": 0,
    'consistent-return': 0,
    'no-bitwise': 0,
    'max-len': 0,
    'arrow-body-style': 0,
    'no-restricted-syntax': 0,
    'no-extend-native': 0,
    'func-names': 0,
    'no-param-reassign': 0,
    "no-underscore-dangle": 0,
    "import/no-cycle": 0,
  }
};