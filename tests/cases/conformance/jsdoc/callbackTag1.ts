// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: cb.js

// TODO: Test nested param types using the nested Object style
/** @callback Sid
 * @param {string} s
 * @returns {string} What were you expecting
 */
var x = 1

/** @type {Sid} smallId */
var sid = s => s + "!";
