module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["standard"],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
    },
    rules: {
        quotes: ["error", "double"],
        semi: ["error", "always"],
        indent: ["error", 4],
        "space-before-function-paren": [
            "error",
            {
                anonymous: "always",
                named: "never",
                asyncArrow: "always"
            }
        ]
    }
};
