// @allowJs: true
// @checkJs: true
// @declaration: true
// @outDir: out

// https://github.com/microsoft/TypeScript/issues/63546

// JavaScript allows a function to be declared more than once. None of these declarations are
// overload implementations, so each one should be kept in its file's declaration output.

// @filename: a.js
/** @param {number} x */
function func(x) {
    return x + 1;
}

// @filename: b.js
/** @param {number} x */
function func(x) {
    return x + 2;
}

function sameFile() {}
var separator = 0;
function sameFile() {
    return 1;
}

// @filename: c.js
// The implementation of a JSDoc overload set is still left out.

/**
 * @overload
 * @param {string} x
 * @returns {string}
 */
/**
 * @overload
 * @param {number} x
 * @returns {number}
 */
/**
 * @param {string | number} x
 */
function overloaded(x) {
    return x;
}
