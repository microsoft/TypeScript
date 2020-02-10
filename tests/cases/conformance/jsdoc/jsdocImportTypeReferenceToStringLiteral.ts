// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: b.js
export const FOO = "foo";

// @Filename: a.js
/** @type {import('./b').FOO} */
let x;
