// manual polyfill of globalThis
var globalThis = global;
var a = 1
var b = 2
var x = globalThis.a + global.b
