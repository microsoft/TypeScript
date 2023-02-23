//// [overloadTag1.js]
/**
 * @overload
 * @param {number} a 
 * @param {number} b
 * @returns {number} 
 *
 * @overload
 * @param {string} a
 * @param {boolean} b
 * @returns {string}
 *
 * @param {string | number} a
 * @param {string | number} b
 * @returns {string | number}
 */
export function overloaded(a,b) {
  if (typeof a === "string" && typeof b === "string") {
    return a + b;
  } else if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  throw new Error("Invalid arguments");
}
var o1 = overloaded(1,2)
var o2 = overloaded("zero", "one")
var o3 = overloaded("a",false)

/**
 * @overload
 * @param {number} a
 * @param {number} b
 * @returns {number}
 *
 * @overload
 * @param {string} a
 * @param {boolean} b
 * @returns {string}
 */
export function uncheckedInternally(a, b) {
    return a + b;
}
uncheckedInternally(1,2)
uncheckedInternally("zero", "one")


//// [overloadTag1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uncheckedInternally = exports.overloaded = void 0;
/**
 * @overload
 * @param {number} a
 * @param {number} b
 * @returns {number}
 *
 * @overload
 * @param {string} a
 * @param {boolean} b
 * @returns {string}
 *
 * @param {string | number} a
 * @param {string | number} b
 * @returns {string | number}
 */
function overloaded(a, b) {
    if (typeof a === "string" && typeof b === "string") {
        return a + b;
    }
    else if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }
    throw new Error("Invalid arguments");
}
exports.overloaded = overloaded;
var o1 = overloaded(1, 2);
var o2 = overloaded("zero", "one");
var o3 = overloaded("a", false);
/**
 * @overload
 * @param {number} a
 * @param {number} b
 * @returns {number}
 *
 * @overload
 * @param {string} a
 * @param {boolean} b
 * @returns {string}
 */
function uncheckedInternally(a, b) {
    return a + b;
}
exports.uncheckedInternally = uncheckedInternally;
uncheckedInternally(1, 2);
uncheckedInternally("zero", "one");


//// [overloadTag1.d.ts]
export function overloaded(a: number, b: number): number;
export function overloaded(a: string, b: boolean): string;
export function uncheckedInternally(a: number, b: number): number;
export function uncheckedInternally(a: string, b: boolean): string;
