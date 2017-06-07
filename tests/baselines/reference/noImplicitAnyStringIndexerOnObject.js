//// [noImplicitAnyStringIndexerOnObject.ts]
var x = {}["hello"];
var y: string = { '': 'foo' }[''];

//// [noImplicitAnyStringIndexerOnObject.js]
var x = {}["hello"];
var y = { '': 'foo' }[''];
