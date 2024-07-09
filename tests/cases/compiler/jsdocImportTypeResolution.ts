// @allowJs: true
// @noEmit: true
// @checkJs: true
// @filename: module.js
export class MyClass {
}

// @filename: usage.js
/**
 * @typedef {Object} options
 * @property {import("./module").MyClass} option
 */
/** @type {options} */
let v;