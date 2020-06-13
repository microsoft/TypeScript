// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: file.js
/**
  * @param {Array=} y desc
  */
function x(y) { }

// @ts-ignore
/** @param {function (Array)} func Invoked
 */
function y(func) { return; }

/**
 * @return {(Array.<> | null)} list of devices
 */
function z() { return null ;}

/**
 * 
 * @return {?Promise} A promise
 */
function w() { return null; }