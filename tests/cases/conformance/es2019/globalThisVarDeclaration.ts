// @outFile: output.js
// @target: esnext
// @lib: esnext, dom
// @Filename: b.js
// @allowJs: true
// @checkJs: true
var a = 10;
this.a;
this.b;
globalThis.a;
globalThis.b;

// DOM access is not supported until the index signature is handled more strictly
self.a;
self.b;
window.a;
window.b;
top.a;
top.b;

// @Filename: actual.ts
var b = 10;
this.a;
this.b;
globalThis.a;
globalThis.b;

// same here -- no DOM access to globalThis yet
self.a;
self.b;
window.a;
window.b;
top.a;
top.b;

