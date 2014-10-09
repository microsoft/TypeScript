//// [indexerWithTuple.ts]
var strNumTuple: [string, number] = ["foo", 10]; 
var numTupleTuple: [number, [string, number]] = [10, ["bar", 20]];

// no error
var idx0 = 0;
var idx1 = 1;
var ele10 = strNumTuple[0]; // string
var ele11 = strNumTuple[1]; // number
var ele12 = strNumTuple[2]; // {}
var ele13 = strNumTuple[idx0]; // {}
var ele14 = strNumTuple[idx1]; // {}
var ele15 = strNumTuple["0"]; // string
var ele16 = strNumTuple["1"]; // number
var strNumTuple1 = numTupleTuple[1];  //[string, number];
var ele17 = numTupleTuple[2]; // {}

//// [indexerWithTuple.js]
var strNumTuple = ["foo", 10];
var numTupleTuple = [10, ["bar", 20]];
// no error
var idx0 = 0;
var idx1 = 1;
var ele10 = strNumTuple[0]; // string
var ele11 = strNumTuple[1]; // number
var ele12 = strNumTuple[2]; // {}
var ele13 = strNumTuple[idx0]; // {}
var ele14 = strNumTuple[idx1]; // {}
var ele15 = strNumTuple["0"]; // string
var ele16 = strNumTuple["1"]; // number
var strNumTuple1 = numTupleTuple[1]; //[string, number];
var ele17 = numTupleTuple[2]; // {}
