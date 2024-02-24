/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const prettierConfig = {
  endOfLine: "lf",
  arrowParens: "avoid",
  bracketSameLine: true,
  bracketSpacing: true,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "none",
  useTabs: false,
  tabWidth: 2,
  singleQuote: false,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrderParserPlugins: ["typescript", "decorators"],
  importOrder: [
    "<TYPES>",
    "<TYPES>^[./]",
    "",
    "^@snowbeam/configs(/.*)?$",
    "",
    "^@snowbeam/core(/.*)?$",
    "",
    "^@snowbeam/settings(/.*)?$",
    "",
    "^@snowbeam/license(/.*)?$",
    "",
    "^@snowbeam/authentication(/.*)?$",
    "",
    "^@snowbeam/nodes(/.*)?$",
    "",
    "^@snowbeam/workflow(/.*)?$",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>(/.*)?$",
    "",
    "^src(/.*)$",
    "",
    "^[./]"
  ]
};

module.exports = prettierConfig;
