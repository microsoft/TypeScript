// @target: es5
// @lib: es6,es2017.sharedmemory

var foge = new SharedArrayBuffer(1024);
var species = foge[Symbol.species];
var stringTag = foge[Symbol.toStringTag];