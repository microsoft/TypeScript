// @checkJs: true
// @allowJs: true
// @noEmit: true
// @Filename: test.js
// all 6 should error on return statement/expression
/** @type {(x: number) => string} */
function h(x) { return x }
/** @type {(x: number) => string} */
var f = x => x
/** @type {(x: number) => string} */
var g = function (x) { return x }

/** @type {{ (x: number): string }} */
function i(x) { return x }
/** @type {{ (x: number): string }} */
var j = x => x
/** @type {{ (x: number): string }} */
var k = function (x) { return x }
