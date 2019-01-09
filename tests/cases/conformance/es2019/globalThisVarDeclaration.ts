// @out: output.js
// @target: esnext
// @lib: esnext
// @Filename: b.js
// @allowJs: true
// @checkJs: true
var a = 10;
this.a;
this.b;

// @Filename: actual.ts
var b = 10;
this.a;
this.b;
