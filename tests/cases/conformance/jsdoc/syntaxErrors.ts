// @checkJs: true
// @allowJs: true
// @noEmit: true

// @Filename: foo.js
/**
 * @param {(x)=>void} x
 * @param {typeof String} y
 * @param {string & number} z
 **/
function foo(x, y, z) { }

// @Filename: skipped.js
// @ts-nocheck
/**
 * @param {(x)=>void} x
 * @param {typeof String} y
 * @param {string & number} z
 **/
function bar(x, y, z) { }
