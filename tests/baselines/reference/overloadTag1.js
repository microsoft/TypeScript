//// [overloadTag1.js]
/**
 * @overload
 * @param {number} a 
 * @param {number} b
 * @returns {number} 
 */
/**
 * @overload
 * @param {string} a
 * @param {boolean} b
 * @returns {string}
 */
/**
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
overloaded(1,2)
overloaded("zero", "one")

//// [overloadTag1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overloaded = void 0;
/**
 * @overload
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
/**
 * @overload
 * @param {string} a
 * @param {boolean} b
 * @returns {string}
 */
/**
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
overloaded(1, 2);
overloaded("zero", "one");


//// [overloadTag1.d.ts]
export function overloaded(a: number, b: number): number;
export function overloaded(a: string, b: boolean): string;
