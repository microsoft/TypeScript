//// [tests/cases/conformance/es2019/globalThisVarDeclaration.ts] ////

//// [b.js]
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

//// [actual.ts]
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



//// [output.js]
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
