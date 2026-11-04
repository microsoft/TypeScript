//// [tests/cases/compiler/jsDeclarationEmitDuplicateFunctionImplementations.ts] ////

//// [a.js]
/** @param {number} x */
function func(x) {
    return x + 1;
}

//// [b.js]
/** @param {number} x */
function func(x) {
    return x + 2;
}

function sameFile() {}
var separator = 0;
function sameFile() {
    return 1;
}

//// [c.js]
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


//// [a.js]
"use strict";
/** @param {number} x */
function func(x) {
    return x + 1;
}
//// [b.js]
"use strict";
/** @param {number} x */
function func(x) {
    return x + 2;
}
function sameFile() { }
var separator = 0;
function sameFile() {
    return 1;
}
//// [c.js]
"use strict";
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


//// [a.d.ts]
//// [b.d.ts]
declare var separator: number;
//// [c.d.ts]
declare function overloaded(x: string): string;
declare function overloaded(x: number): number;
