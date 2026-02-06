//// [tests/cases/conformance/es2017/useSharedArrayBuffer2.ts] ////

//// [useSharedArrayBuffer2.ts]
var foge = new SharedArrayBuffer(1024);
var bar = foge.slice(1, 10);
var len = foge.byteLength;

//// [useSharedArrayBuffer2.js]
"use strict";
var foge = new SharedArrayBuffer(1024);
var bar = foge.slice(1, 10);
var len = foge.byteLength;
