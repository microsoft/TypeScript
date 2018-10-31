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
z.x = 1; // Error

// @template tag should not interfere with constraint or default.
/** @template T */
interface I<T extends number = 0> {}

/** @template T */
function tem<T extends number>(t: T): I<T> { return {}; }

let i: I; // Should succeed thanks to type parameter default

/** @typedef {string} N.Str */
import M = N; // Error: @typedef does not create namespaces in TypeScript code.

// Not legal JSDoc, but that shouldn't matter in TypeScript.
/**
 * @type {{foo: (function(string, string): string)}}
 */
const obj = { foo: (a, b) => a + b };

/** @enum {string} */
var E = {};
E[""];

// make sure import types in JSDoc are not resolved
/** @type {import("should-not-be-resolved").Type} */
var v = import(String());


//// [jsdocInTypeScript.js]
var T = /** @class */ (function () {
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
z.x = 1; // Error
/** @template T */
function tem(t) { return {}; }
var i; // Should succeed thanks to type parameter default
/** @typedef {string} N.Str */
var M = N; // Error: @typedef does not create namespaces in TypeScript code.
// Not legal JSDoc, but that shouldn't matter in TypeScript.
/**
 * @type {{foo: (function(string, string): string)}}
 */
var obj = { foo: function (a, b) { return a + b; } };
/** @enum {string} */
var E = {};
E[""];
// make sure import types in JSDoc are not resolved
/** @type {import("should-not-be-resolved").Type} */
var v = Promise.resolve().then(function () { return require(String()); });
