//// [jsdocInTypeScript.ts]
// JSDoc typedef tags are not bound TypeScript files.
/** @typedef {function} T */
declare const x: T;

class T {
    prop: number;
}

x.prop;

// Just to be sure that @property has no impact either.
/**
 * @typedef {Object} MyType
 * @property {string} yes
 */
declare const myType: MyType; // should error, no such type

// @param type has no effect.
/**
 * @param {number} x
 * @returns string
 */
function f(x: boolean) { return x * 2; } // Should error
// Should fail, because it takes a boolean and returns a number
f(1); f(true).length;

// @type has no effect either.
/** @type {{ x?: number }} */
const z = {};
z.x = 1;


//// [jsdocInTypeScript.js]
var T = (function () {
    function T() {
    }
    return T;
}());
x.prop;
// @param type has no effect.
/**
 * @param {number} x
 * @returns string
 */
function f(x) { return x * 2; } // Should error
// Should fail, because it takes a boolean and returns a number
f(1);
f(true).length;
// @type has no effect either.
/** @type {{ x?: number }} */
var z = {};
z.x = 1;
