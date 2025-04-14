// @checkJs: true
// @allowJs: true
// @outdir: foo
// @declaration: true
// @filename: overloadTag1.js
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
