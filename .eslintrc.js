module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": ["airbnb", "plugin:prettier/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018
    },
     "settings": {
	 "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
     },
    "plugins": [
        "react",
    ],
    "rules": {
    }
};
