
// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: a.js

/**
 * A number, or a string containing a number.
 * @typedef {(number|string)} NumberLike
 */

export default /** @type {NumberLike[]} */([ ]);

// @Filename: b.ts
import A from './a'
A[0]