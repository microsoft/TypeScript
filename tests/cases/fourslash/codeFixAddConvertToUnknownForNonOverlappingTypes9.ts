/// <reference path='fourslash.ts' />

// @checkJs: true
// @allowJs: true
// @filename: a.js
////let x = /** @type {string} */ (100);

verify.not.codeFixAvailable(ts.Diagnostics.Add_unknown_conversion_for_non_overlapping_types.message);
