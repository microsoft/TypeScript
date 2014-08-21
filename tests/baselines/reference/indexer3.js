//// [indexer3.ts]
var dateMap: { [x: string]: Date; } = {}
var r: Date = dateMap["hello"] // result type includes indexer using BCT

//// [indexer3.js]
var dateMap = {};
var r = dateMap["hello"]; // result type includes indexer using BCT
