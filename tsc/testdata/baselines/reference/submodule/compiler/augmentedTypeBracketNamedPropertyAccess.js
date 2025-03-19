//// [tests/cases/compiler/augmentedTypeBracketNamedPropertyAccess.ts] ////

//// [augmentedTypeBracketNamedPropertyAccess.ts]
interface Object {
    data: number;
}
interface Function {
    functionData: string;
}
var o = {};
var f = function () { };

var r1 = o['data']; // Should be number
var r2 = o['functionData']; // Should be any (no property found)
var r3 = f['functionData']; // Should be string
var r4 = f['data']; // Should be number

//// [augmentedTypeBracketNamedPropertyAccess.js]
var o = {};
var f = function () { };
var r1 = o['data']; // Should be number
var r2 = o['functionData']; // Should be any (no property found)
var r3 = f['functionData']; // Should be string
var r4 = f['data']; // Should be number
