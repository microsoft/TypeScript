// @target: es5
// @lib: es5

var foge = new SharedArrayBuffer(1024);
var bar = foge.slice(1, 10);
var len = foge.byteLength;