// @strict: true
// @allowJs: true
// @checkJs: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57460

// @filename: eslint-plugin-react.js

const deprecatedRules = {
  "jsx-sort-default-props": true
}

const allRules = {
  'no-unsafe': true
}

module.exports = {
  plugins: {
    react: {
      deprecatedRules,
      rules: allRules,
    },
  },
};

// @Filename: typescript-eslint.js

/**
 * @typedef {{ rules: Record<string, boolean> }} Plugin
 */

/**
 * @typedef {{ plugins: Record<string, Plugin> }} Config
 */

/**
 * @type {(...configs: Config[]) => void}
 */
function config(...configs) { }

module.exports = { config };

// @Filename: eslint.config.js

const eslintReact = require('./eslint-plugin-react.js');
const tseslint = require('./typescript-eslint.js');

tseslint.config(eslintReact)
