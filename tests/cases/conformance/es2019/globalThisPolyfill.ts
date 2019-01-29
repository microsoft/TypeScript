// manual polyfill of globalThis

var globalThis = this;
var a = 1;
var x = globalThis.a + a;
