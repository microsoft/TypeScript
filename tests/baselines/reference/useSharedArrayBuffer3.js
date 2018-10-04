//// [useSharedArrayBuffer3.ts]
var foge = new SharedArrayBuffer(1024);
var bar = foge.slice(1, 10);
var len = foge.byteLength;

//// [useSharedArrayBuffer3.js]
var foge = new SharedArrayBuffer(1024);
var bar = foge.slice(1, 10);
var len = foge.byteLength;
