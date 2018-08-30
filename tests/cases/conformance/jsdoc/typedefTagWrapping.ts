// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: mod1.js

/** 
 * @typedef {function(string): boolean}
 * MyType
 */

/**
 * Tries to use a type whose name is on a different
 * line than the typedef tag.
 * @param {MyType} func The function to call.
 * @param {string} arg The argument to call it with.
 * @returns {boolean} The return.
 */
function callIt(func, arg) {
  return func(arg);
}
