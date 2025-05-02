//// [tests/cases/conformance/es2017/useSharedArrayBuffer6.ts] ////

//// [useSharedArrayBuffer6.ts]
var foge = new SharedArrayBuffer(1024);
foge.length; // should error

var length = SharedArrayBuffer.length;


//// [useSharedArrayBuffer6.js]
var foge = new SharedArrayBuffer(1024);
foge.length; // should error
var length = SharedArrayBuffer.length;
