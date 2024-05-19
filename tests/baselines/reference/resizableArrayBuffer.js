//// [tests/cases/conformance/es2024/resizableArrayBuffer.ts] ////

//// [resizableArrayBuffer.ts]
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
buffer.resizable;

//// [resizableArrayBuffer.js]
var buffer = new ArrayBuffer(8, { maxByteLength: 16 });
buffer.resizable;
