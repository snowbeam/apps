/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "@snowbeam/typescript/base.json"
  },
  extends: [
    "next",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier"
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true
      }
    ],
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" }
    ],
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: {
          attributes: false
        }
      }
    ]
  },
  ignorePatterns: [
    "**/*.config.js",
    "**/*.config.cjs",
    "packages/@snowbeam/eslint-config/**",
    "packages/@snowbeam/tsconfig-config/**",
    "packages/@snowbeam/tailwind-config/**"
  ],
  reportUnusedDisableDirectives: true
};

module.exports = eslintConfig;
