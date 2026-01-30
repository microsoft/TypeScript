//// [tests/cases/conformance/es2017/assignSharedArrayBufferToArrayBuffer.ts] ////

//// [assignSharedArrayBufferToArrayBuffer.ts]
var foo: ArrayBuffer = new SharedArrayBuffer(1024); // should error

//// [assignSharedArrayBufferToArrayBuffer.js]
var foo = new SharedArrayBuffer(1024); // should error
