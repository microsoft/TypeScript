// @noEmit: true
// @allowJs: true
// @checkJs: true

// @Filename: def.js
/** @typedef {number} X */
export const { X, Y } = { X: { a: 1, m: 1 }, Y: "why" };

// @Filename: use.js
import { X } from "./def";

/** @type {X} */
const n = 1;
