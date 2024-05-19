//// [tests/cases/conformance/es2024/transferableArrayBuffer.ts] ////

//// [transferableArrayBuffer.ts]
const buffer = new ArrayBuffer(8);
const buffer2 = buffer.transfer();

buffer.detached;
buffer2.detached;

//// [transferableArrayBuffer.js]
var buffer = new ArrayBuffer(8);
var buffer2 = buffer.transfer();
buffer.detached;
buffer2.detached;
