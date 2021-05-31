// @allowJs: true
// @checkJs: true
// @noEmit: true
// @allowUnreachableCode: false
// @filename: assertionsAndNonReturningFunctions.js

/** @typedef {(check: boolean) => asserts check} AssertFunc */

/** @type {AssertFunc} */
const assert = check => {
    if (!check) throw new Error();
}

/** @type {(x: unknown) => asserts x is string } */
function assertIsString(x) {
    if (!(typeof x === "string")) throw new Error();
}

/**
 * @param {boolean} check
 * @returns {asserts check}
*/
function assert2(check) {
    if (!check) throw new Error();
}

/**
 * @returns {never}
 */
function fail() {
    throw new Error();
}

/**
 * @param {*} x 
 */
function f1(x) {
    if (!!true) {
        assert(typeof x === "string");
        x.length;
    }
    if (!!true) {
        assert2(typeof x === "string");
        x.length;
    }
    if (!!true) {
        assertIsString(x);
        x.length;
    }
    if (!!true) {
        fail();
        x;  // Unreachable
    }
}

/**
 * @param {boolean} b 
 */
function f2(b) {
    switch (b) {
        case true: return 1;
        case false: return 0;
    }
    b;  // Unreachable
}
