//// [tests/cases/conformance/es2019/globalThisVarDeclaration.ts] ////

//// [b.js]
var a = 10;
this.a;
this.b;
globalThis.a;
globalThis.b;
self.a;
self.b;
window.a;
window.b;

//// [actual.ts]
var b = 10;
this.a;
this.b;
globalThis.a;
globalThis.b;
self.a;
self.b;
window.a;
window.b;



//// [output.js]
var a = 10;
this.a;
this.b;
globalThis.a;
globalThis.b;
self.a;
self.b;
window.a;
window.b;
var b = 10;
this.a;
this.b;
globalThis.a;
globalThis.b;
self.a;
self.b;
window.a;
window.b;
