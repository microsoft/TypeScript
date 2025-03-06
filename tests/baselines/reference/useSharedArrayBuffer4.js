//// [tests/cases/conformance/es2017/useSharedArrayBuffer4.ts] ////

//// [useSharedArrayBuffer4.ts]
var foge = new SharedArrayBuffer(1024);
var bar = foge.slice(1, 10);
var species = foge[Symbol.species];
var stringTag = foge[Symbol.toStringTag];
var len = foge.byteLength;

//// [useSharedArrayBuffer4.js]
var foge = new SharedArrayBuffer(1024);
var bar = foge.slice(1, 10);
var species = foge[Symbol.species];
var stringTag = foge[Symbol.toStringTag];
var len = foge.byteLength;
