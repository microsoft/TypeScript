//// [typeGuardOfFormExpr1OrExpr2.ts]
var str: string;
var bool: boolean;
var num: number;
var strOrNum: string | number;
var strOrNumOrBool: string | number | boolean;
var numOrBool: number | boolean;
class C { private p; }
var c: C;
var cOrBool: C| boolean;
var strOrNumOrBoolOrC: string | number | boolean | C;

// A type guard of the form expr1 || expr2
//  - when true, narrows the type of x to T1 | T2, where T1 is the type of x narrowed by expr1 when true, 
//    and T2 is the type of x narrowed by expr1 when false and then by expr2 when true, or
//  - when false, narrows the type of x by expr1 when false and then by expr2 when false.

// (typeguard1 || typeguard2)
if (typeof strOrNumOrBool === "string" || typeof strOrNumOrBool === "number") {
    strOrNum = strOrNumOrBool; // string | number
}
else {
    bool = strOrNumOrBool; // boolean
}
// (typeguard1 || typeguard2 || typeguard3)
if (typeof strOrNumOrBoolOrC === "string" || typeof strOrNumOrBoolOrC === "number" || typeof strOrNumOrBoolOrC === "boolean") {
    strOrNumOrBool = strOrNumOrBoolOrC; // string | number | boolean
}
else {
    c = strOrNumOrBoolOrC; // C
}
// (typeguard1 || typeguard2 || typeguard11(onAnotherType))
if (typeof strOrNumOrBoolOrC === "string" || typeof strOrNumOrBoolOrC === "number" || typeof strOrNumOrBool !== "boolean") {
    var r1: string | number | boolean | C = strOrNumOrBoolOrC; // string | number | boolean | C
    var r2: string | number | boolean = strOrNumOrBool;
}
else {
    cOrBool = strOrNumOrBoolOrC; // C | boolean
    bool = strOrNumOrBool; // boolean
}
// (typeguard1) || simpleExpr
if (typeof strOrNumOrBool === "string" || numOrBool !== strOrNumOrBool) {
    var r3: string | number | boolean = strOrNumOrBool; // string | number | boolean
}
else {
    numOrBool = strOrNumOrBool; // number | boolean
}

//// [typeGuardOfFormExpr1OrExpr2.js]
var str;
var bool;
var num;
var strOrNum;
var strOrNumOrBool;
var numOrBool;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c;
var cOrBool;
var strOrNumOrBoolOrC;
// A type guard of the form expr1 || expr2
//  - when true, narrows the type of x to T1 | T2, where T1 is the type of x narrowed by expr1 when true, 
//    and T2 is the type of x narrowed by expr1 when false and then by expr2 when true, or
//  - when false, narrows the type of x by expr1 when false and then by expr2 when false.
// (typeguard1 || typeguard2)
if (typeof strOrNumOrBool === "string" || typeof strOrNumOrBool === "number") {
    strOrNum = strOrNumOrBool; // string | number
}
else {
    bool = strOrNumOrBool; // boolean
}
// (typeguard1 || typeguard2 || typeguard3)
if (typeof strOrNumOrBoolOrC === "string" || typeof strOrNumOrBoolOrC === "number" || typeof strOrNumOrBoolOrC === "boolean") {
    strOrNumOrBool = strOrNumOrBoolOrC; // string | number | boolean
}
else {
    c = strOrNumOrBoolOrC; // C
}
// (typeguard1 || typeguard2 || typeguard11(onAnotherType))
if (typeof strOrNumOrBoolOrC === "string" || typeof strOrNumOrBoolOrC === "number" || typeof strOrNumOrBool !== "boolean") {
    var r1 = strOrNumOrBoolOrC; // string | number | boolean | C
    var r2 = strOrNumOrBool;
}
else {
    cOrBool = strOrNumOrBoolOrC; // C | boolean
    bool = strOrNumOrBool; // boolean
}
// (typeguard1) || simpleExpr
if (typeof strOrNumOrBool === "string" || numOrBool !== strOrNumOrBool) {
    var r3 = strOrNumOrBool; // string | number | boolean
}
else {
    numOrBool = strOrNumOrBool; // number | boolean
}
