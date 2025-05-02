//// [tests/cases/conformance/types/tuple/indexerWithTuple.ts] ////

//// [indexerWithTuple.ts]
var strNumTuple: [string, number] = ["foo", 10];
var numTupleTuple: [number, [string, number]] = [10, ["bar", 20]];
var unionTuple1: [number, string| number] = [10, "foo"];
var unionTuple2: [boolean, string| number] = [true, "foo"];

// no error
var idx0 = 0;
var idx1 = 1;
var ele10 = strNumTuple[0]; // string
var ele11 = strNumTuple[1]; // number
var ele12 = strNumTuple[2]; // string | number
var ele13 = strNumTuple[idx0]; // string | number
var ele14 = strNumTuple[idx1]; // string | number
var ele15 = strNumTuple["0"]; // string
var ele16 = strNumTuple["1"]; // number
var strNumTuple1 = numTupleTuple[1];  //[string, number];
var ele17 = numTupleTuple[2]; // number | [string, number]
var ele19 = strNumTuple[-1]   // undefined

var eleUnion10 = unionTuple1[0]; // number
var eleUnion11 = unionTuple1[1]; // string | number
var eleUnion12 = unionTuple1[2]; // string | number
var eleUnion13 = unionTuple1[idx0]; // string | number
var eleUnion14 = unionTuple1[idx1]; // string | number
var eleUnion15 = unionTuple1["0"]; // number
var eleUnion16 = unionTuple1["1"]; // string | number

var eleUnion20 = unionTuple2[0]; // boolean
var eleUnion21 = unionTuple2[1]; // string | number
var eleUnion22 = unionTuple2[2]; // string | number | boolean
var eleUnion23 = unionTuple2[idx0]; // string | number | boolean
var eleUnion24 = unionTuple2[idx1]; // string | number | boolean
var eleUnion25 = unionTuple2["0"]; // boolean
var eleUnion26 = unionTuple2["1"]; // string | number

type t1 = [string, number][0];  // string
type t2 = [string, number][1];  // number
type t3 = [string, number][-1]; // undefined


//// [indexerWithTuple.js]
var strNumTuple = ["foo", 10];
var numTupleTuple = [10, ["bar", 20]];
var unionTuple1 = [10, "foo"];
var unionTuple2 = [true, "foo"];
// no error
var idx0 = 0;
var idx1 = 1;
var ele10 = strNumTuple[0]; // string
var ele11 = strNumTuple[1]; // number
var ele12 = strNumTuple[2]; // string | number
var ele13 = strNumTuple[idx0]; // string | number
var ele14 = strNumTuple[idx1]; // string | number
var ele15 = strNumTuple["0"]; // string
var ele16 = strNumTuple["1"]; // number
var strNumTuple1 = numTupleTuple[1]; //[string, number];
var ele17 = numTupleTuple[2]; // number | [string, number]
var ele19 = strNumTuple[-1]; // undefined
var eleUnion10 = unionTuple1[0]; // number
var eleUnion11 = unionTuple1[1]; // string | number
var eleUnion12 = unionTuple1[2]; // string | number
var eleUnion13 = unionTuple1[idx0]; // string | number
var eleUnion14 = unionTuple1[idx1]; // string | number
var eleUnion15 = unionTuple1["0"]; // number
var eleUnion16 = unionTuple1["1"]; // string | number
var eleUnion20 = unionTuple2[0]; // boolean
var eleUnion21 = unionTuple2[1]; // string | number
var eleUnion22 = unionTuple2[2]; // string | number | boolean
var eleUnion23 = unionTuple2[idx0]; // string | number | boolean
var eleUnion24 = unionTuple2[idx1]; // string | number | boolean
var eleUnion25 = unionTuple2["0"]; // boolean
var eleUnion26 = unionTuple2["1"]; // string | number
