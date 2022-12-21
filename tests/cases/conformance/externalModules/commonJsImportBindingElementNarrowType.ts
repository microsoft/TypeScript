// Regresion test for GH#41957

// @allowJs: true
// @checkJs: true
// @strictNullChecks: true
// @noEmit: true

// @Filename: /foo.d.ts
export const a: number | null;

// @Filename: /bar.js
const { a } = require("./foo");
if (a) {
  var x = a + 1;
}