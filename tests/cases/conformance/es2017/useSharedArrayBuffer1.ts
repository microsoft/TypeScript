// @target: es5
// @lib: es5,es2017.sharedmemory

var foge = new SharedArrayBuffer(1024);
var bar = foge.slice(1, 10);
var len = foge.byteLength;