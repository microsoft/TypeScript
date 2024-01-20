// @target: esnext
// @checkJs: true
// @allowJs: true
// @noEmit: true
// @filename: ./a.js

/** @type {unique symbol} */
const foo = Symbol();

/** @typedef {{ [foo]: boolean }} A */
/** @typedef {{ [key: foo] boolean }} B */
