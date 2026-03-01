//// [tests/cases/compiler/indexer3.ts] ////

//// [indexer3.ts]
var dateMap: { [x: string]: Date; } = {}
var r: Date = dateMap["hello"] // result type includes indexer using BCT

//// [indexer3.js]
"use strict";
var dateMap = {};
var r = dateMap["hello"]; // result type includes indexer using BCT
