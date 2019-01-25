// @checkJs: true
// @allowJs: true
// @noEmit: true
// @Filename: test.js
// all 6 should error on return statement/expression
/** @type {(x: number) => string} */
function h(x) { return x }
/** @type {(x: number) => string} */
var f = x => x
/** @type {(x: number) => string} */
var g = function (x) { return x }

/** @type {{ (x: number): string }} */
function i(x) { return x }
/** @type {{ (x: number): string }} */
var j = x => x
/** @type {{ (x: number): string }} */
var k = function (x) { return x }


/** @typedef {(x: 'hi' | 'bye') => 0 | 1 | 2} Argle */
/** @type {Argle} */
function blargle(s) {
    return 0;
}

/** @type {0 | 1 | 2} - assignment should not error */
var zeroonetwo = blargle('hi')

/** @typedef {{(s: string): 0 | 1; (b: boolean): 2 | 3 }} Gioconda */

/** @type {Gioconda} */
function monaLisa(sb) {
    return typeof sb === 'string' ? 1 : 2;
}

/** @type {2 | 3} - overloads are not supported, so there will be an error */
var twothree = monaLisa(false);
