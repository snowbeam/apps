/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const prettierConfig = {
  ...require('@snowbeam/prettier-config'),
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrderParserPlugins: ['typescript', 'decorators'],
  importOrder: [
    '<TYPES>',
    '<TYPES>^[./]',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>(/.*)?$',
    '',
    '^src(/.*)$',
    '',
    '^[./]'
  ]
};

module.exports = prettierConfig;
