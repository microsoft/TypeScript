// @noEmit: true
// @allowJs: true
// @checkJs: true

// @Filename: def.js
/** @typedef {number} X */
export let X = { a: 1, m: 1 };

// @Filename: use.js
import { X } from "./def";

/** @type {X} */
const n = 1;
