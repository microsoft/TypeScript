// @allowJs: true
// @noEmit: true

// @filename: test.js
// @ts-check
/** @typedef {number} NotADuplicateIdentifier */

(2 * 2);

/** @typedef {number} AlsoNotADuplicate */

(2 * 2) + 1;


/**
 * 
 * @param a {NotADuplicateIdentifier}
 * @param b {AlsoNotADuplicate}
 */
function makeSureTypedefsAreStillRecognized(a, b) {}
