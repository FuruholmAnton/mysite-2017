module.exports = {
<<<<<<< HEAD
    root: true,
    parser: 'babel-eslint',
    extends: [
      "google",
      "plugin:react/recommended",
      'plugin:css-modules/recommended',
    ],
    parserOptions: {
=======
    "root": true,
    "extends": [
        "google", 
        "plugin:react/recommended",
        'plugin:css-modules/recommended',
    ],
    "parserOptions": {
>>>>>>> Work
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    rules: {
        "semi": 2,
        "require-jsdoc": 0,
        "valid-jsdoc": [1, {
            "prefer": {
                "return": "returns"
            },
            "requireReturn": false
        }],
        "keyword-spacing": 2,
        "max-len": 0,
        "object-curly-spacing": [2, "always"],
        "brace-style": 0
    },
<<<<<<< HEAD
    env: {
=======
    globals: {
        __DEV__: true,
    },
    "env": {
>>>>>>> Work
        "browser": true,
        // "node": true,
        // "es6": true
    },
    plugins: [
        "react",
        'css-modules',
    ],

    globals: {
      __DEV__: true,
    },
};
