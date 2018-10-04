// @allowJs: true
// @filename: returns.js
// @out: dummy.js
/**
 * @returns {string} This comment is not currently exposed
 */
function f() {
    return 5;
}

/**
 * @returns {string=} This comment is not currently exposed
 */
function f1() {
    return 5;
}

/**
 * @returns {string|number} This comment is not currently exposed
 */
function f2() {
    return 5 || "hello";
}