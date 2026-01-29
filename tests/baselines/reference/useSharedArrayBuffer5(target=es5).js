//// [tests/cases/conformance/es2017/useSharedArrayBuffer5.ts] ////

//// [useSharedArrayBuffer5.ts]
var foge = new SharedArrayBuffer(1024);
var stringTag = foge[Symbol.toStringTag];
var species = SharedArrayBuffer[Symbol.species];

//// [useSharedArrayBuffer5.js]
var foge = new SharedArrayBuffer(1024);
var stringTag = foge[Symbol.toStringTag];
var species = SharedArrayBuffer[Symbol.species];
