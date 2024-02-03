/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const prettierConfig = {
  ...require('@snowbeam/prettier-config'),
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrderParserPlugins: ['typescript', 'decorators'],
  importOrder: [
    '<TYPES>',
    '<TYPES>^[./]',
    '',
    '^@snowbeam/configs(/.*)?$',
    '',
    '^@snowbeam/core(/.*)?$',
    '',
    '^@snowbeam/settings(/.*)?$',
    '',
    '^@snowbeam-modules/license(/.*)?$',
    '^@snowbeam-modules/authentication(/.*)?$',
    '^@snowbeam-modules/nodes(/.*)?$',
    '^@snowbeam-modules/workflow(/.*)?$',
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
