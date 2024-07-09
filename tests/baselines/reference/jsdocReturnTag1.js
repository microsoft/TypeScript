//// [tests/cases/conformance/jsdoc/jsdocReturnTag1.ts] ////

//// [returns.js]
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


//// [dummy.js]
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
