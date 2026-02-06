// @target: es5, es2015
// @lib: es6,es2017.sharedmemory

var foge = new SharedArrayBuffer(1024);
var stringTag = foge[Symbol.toStringTag];
var species = SharedArrayBuffer[Symbol.species];