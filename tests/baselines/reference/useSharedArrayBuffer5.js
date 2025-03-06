//// [tests/cases/conformance/es2017/useSharedArrayBuffer5.ts] ////

//// [useSharedArrayBuffer5.ts]
var foge = new SharedArrayBuffer(1024);
var species = foge[Symbol.species];
var stringTag = foge[Symbol.toStringTag];

//// [useSharedArrayBuffer5.js]
var foge = new SharedArrayBuffer(1024);
var species = foge[Symbol.species];
var stringTag = foge[Symbol.toStringTag];
