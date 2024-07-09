// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.js
/**
 * @typedef MyType
 * @property {sting} [x]
 */

/** @param {MyType} p  */
export function f(p) { }

// @Filename: /b.js
import { f } from "./a.js"
f({ x: 42 })
