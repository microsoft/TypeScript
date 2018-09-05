// @checkJs: true
// @allowJs: true
// @noEmit: true
// @Filename: test.js

/** @type {number} */
function f() {
    return 1
}

/** @type {{ prop: string }} */
var g = function (prop) {
}

/** @type {(a: number) => number} */
function add1(a, b) { return a + b; }

/** @type {(a: number, b: number) => number} */
function add2(a, b) { return a + b; }

// TODO: Should be an error since signature doesn't match.
/** @type {(a: number, b: number, c: number) => number} */
function add3(a, b) { return a + b; }
