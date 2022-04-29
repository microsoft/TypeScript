//// [useSharedArrayBuffer5.ts]
var foge = new SharedArrayBuffer(1024);
var species = foge[Symbol.species];
var stringTag = foge[Symbol.toStringTag];

//// [useSharedArrayBuffer5.js]
var foge = new SharedArrayBuffer(1024);
var species = foge[Symbol.species];
var stringTag = foge[Symbol.toStringTag];
