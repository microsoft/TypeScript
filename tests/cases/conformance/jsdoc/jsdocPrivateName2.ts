// @allowJs: true
// @checkJs: true
// @noEmit: true
// @lib: dom,esnext
// @Filename: jsdocPrivateName1.js

// Expecting parse error for private field

/**
 * @typedef A
 * @type {object}
 * @property {string} #id
 */
