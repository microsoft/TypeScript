// @target: es5
// @lib: es2015,es2017.sharedmemory

var foo: ArrayBuffer = new SharedArrayBuffer(1024); // should error