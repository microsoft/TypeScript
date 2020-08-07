// @noEmit: true
// @allowJs: true
// @checkJs: true

// @Filename: def.js
/** @typedef {number} Y */
const Y = { a: 1, m: 1 };
export { Y as X };

// @Filename: use.js
import { X } from "./def";

/** @type {X} */
const n = 1;
