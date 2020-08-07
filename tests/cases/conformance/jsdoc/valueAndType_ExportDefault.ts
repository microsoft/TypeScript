// @noEmit: true
// @allowJs: true
// @checkJs: true

// @Filename: def.js
/** @typedef {number} X */
const X = { a: 1, m: 1 };
export default X;

// @Filename: use.js
import X from "./def";

/** @type {X} */
const n = 1;
