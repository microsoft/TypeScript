// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: a.js

// from bcryptjs
/** @param {function(...[*])} callback */
function g(callback) {
    callback([1], [2], [3])
}

/**
 * @type {!function(...number):string}
 * @inner
 */
var stringFromCharCode = String.fromCharCode;
