// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.js
// Bad: missing a type
/** @typedef T */

const t = 0;

// OK: missing a type, but have property tags.
/**
 * @typedef Person
 * @property {string} name
 */

/** @type Person */
const person = { name: "" };
