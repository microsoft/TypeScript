// @allowJs: true
// @target: es2015,es2020
// @module: none
// @outFile: /a.js
// @filename: /a.ts
const foo = import("./b");

// @filename: /b.js
export default 1;
