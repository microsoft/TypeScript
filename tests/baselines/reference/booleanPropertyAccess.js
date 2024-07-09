//// [tests/cases/conformance/types/primitives/boolean/booleanPropertyAccess.ts] ////

//// [booleanPropertyAccess.ts]
var x = true;

var a = x.toString();
var b = x['toString']();

//// [booleanPropertyAccess.js]
var x = true;
var a = x.toString();
var b = x['toString']();
