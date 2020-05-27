
// @allowJs: true
// @checkJs: true
// @noEmit: true

/**
 * A number, or a string containing a number.
 * @typedef {(number|string)} NumberLike
 */

// @Filename: a.js
export default /** @type {NumberLike[]} */([ ]);

// @Filename: b.ts
import A from './a'
A[0]