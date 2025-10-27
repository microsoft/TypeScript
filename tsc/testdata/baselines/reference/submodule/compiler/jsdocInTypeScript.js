//// [tests/cases/compiler/jsdocInTypeScript.ts] ////

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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
class T {
    prop;
}
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
const z = {};
z.x = 1; // Error
/** @template T */
function tem(t) { return {}; }
let i; // Should succeed thanks to type parameter default
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
var v = Promise.resolve(`${String()}`).then(s => __importStar(require(s)));
