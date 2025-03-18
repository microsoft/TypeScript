//// [tests/cases/conformance/expressions/typeGuards/typeGuardOfFormTypeOfNotEqualHasNoEffect.ts] ////

//// [typeGuardOfFormTypeOfNotEqualHasNoEffect.ts]
class C { private p: string };

var strOrNum: string | number;
var strOrBool: string | boolean;
var numOrBool: number | boolean
var strOrC: string | C;

// typeof x != s has not effect on typeguard
if (typeof strOrNum != "string") {
    var r1 = strOrNum; // string | number
}
else {
    var r1 = strOrNum; // string | number
}

if (typeof strOrBool != "boolean") {
    var r2 = strOrBool; // string | boolean
}
else {
    var r2 = strOrBool; // string | boolean
}

if (typeof numOrBool != "number") {
    var r3 = numOrBool; // number | boolean
}
else {
    var r3 = numOrBool; // number | boolean
}

if (typeof strOrC != "Object") {
    var r4 = strOrC; // string | C
}
else {
    var r4 = strOrC; // string | C
}

//// [typeGuardOfFormTypeOfNotEqualHasNoEffect.js]
class C {
    p;
}
;
var strOrNum;
var strOrBool;
var numOrBool;
var strOrC;
if (typeof strOrNum != "string") {
    var r1 = strOrNum;
}
else {
    var r1 = strOrNum;
}
if (typeof strOrBool != "boolean") {
    var r2 = strOrBool;
}
else {
    var r2 = strOrBool;
}
if (typeof numOrBool != "number") {
    var r3 = numOrBool;
}
else {
    var r3 = numOrBool;
}
if (typeof strOrC != "Object") {
    var r4 = strOrC;
}
else {
    var r4 = strOrC;
}
