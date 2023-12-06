//// [tests/cases/conformance/controlFlow/assertionTypePredicates2.ts] ////

//// [assertionTypePredicates2.js]
/**
 * @typedef {{ x: number }} A
 */

/**
 * @typedef { A & { y: number } } B
 */

/**
 * @param {A} a
 * @returns { asserts a is B }
 */
const foo = (a) => {
    if (/** @type { B } */ (a).y !== 0) throw TypeError();
    return undefined;
};

export const main = () => {
    /** @type { A } */
    const a = { x: 1 };
    foo(a);
};


//// [assertionTypePredicates2.js]
"use strict";
/**
 * @typedef {{ x: number }} A
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
/**
 * @typedef { A & { y: number } } B
 */
/**
 * @param {A} a
 * @returns { asserts a is B }
 */
var foo = function (a) {
    if ( /** @type { B } */(a).y !== 0)
        throw TypeError();
    return undefined;
};
var main = function () {
    /** @type { A } */
    var a = { x: 1 };
    foo(a);
};
exports.main = main;
