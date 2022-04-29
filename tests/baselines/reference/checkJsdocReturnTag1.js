//// [returns.js]
// @ts-check
/**
 * @returns {string} This comment is not currently exposed
 */
function f() {
    return "hello";
}

/**
 * @returns {string=} This comment is not currently exposed
 */
function f1() {
    return "hello world";
}

/**
 * @returns {string|number} This comment is not currently exposed
 */
function f2() {
    return 5 || "hello";
}

//// [dummy.js]
// @ts-check
/**
 * @returns {string} This comment is not currently exposed
 */
function f() {
    return "hello";
}
/**
 * @returns {string=} This comment is not currently exposed
 */
function f1() {
    return "hello world";
}
/**
 * @returns {string|number} This comment is not currently exposed
 */
function f2() {
    return 5 || "hello";
}
