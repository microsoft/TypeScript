// @allowJs: true
// @out: out.js
// @declaration: true
// @filename: a.ts
var x = 10;

// @filename: b.js
var x = "hello"; // Error is recorded here, but suppressed because the js file isn't checked
