// @noEmit: true
// @allowJS: true
// @checkJs: true

// @filename: /a.js

/** @satisfies {{ f: (x: string) => string }} */
const t1 = { f: s => s.toLowerCase() }; // should work

/** @satisfies {{ f: (x: string) => string }} */
const t2 = { g: "oops" }; // should error
