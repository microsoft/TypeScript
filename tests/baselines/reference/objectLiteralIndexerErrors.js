//// [objectLiteralIndexerErrors.js]
var a;
var b;
var c;

var o1 = { x: b, 0: a };
o1 = { x: c, 0: a }; // string indexer is any, number indexer is A
