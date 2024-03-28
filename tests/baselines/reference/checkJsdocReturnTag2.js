//// [tests/cases/conformance/jsdoc/checkJsdocReturnTag2.ts] ////

//// [returns.js]
// @ts-check
/**
 * @returns {string} This comment is not currently exposed
 */
function f() {
    return 5;
}

/**
 * @returns {string | number} This comment is not currently exposed
 */
function f1() {
    return 5 || true;
}


//// [dummy.js]
// @ts-check
/**
 * @returns {string} This comment is not currently exposed
 */
function f() {
    return 5;
}
/**
 * @returns {string | number} This comment is not currently exposed
 */
function f1() {
    return 5 || true;
}
