// @target: es5, es2015
// @lib: es6,es2017.sharedmemory

var foge = new SharedArrayBuffer(1024);
foge.length; // should error

var length = SharedArrayBuffer.length;
