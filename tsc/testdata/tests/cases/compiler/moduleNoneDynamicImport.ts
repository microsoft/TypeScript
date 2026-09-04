// @allowJs: true
// @target: es2015,es2020
// @module: none
// @outDir: out
// @filename: /a.ts
const foo = import("./b");

// @filename: /b.js
export default 1;
