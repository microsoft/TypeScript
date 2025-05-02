//// [tests/cases/conformance/expressions/typeGuards/typeGuardOfFormNotExpr.ts] ////

//// [typeGuardOfFormNotExpr.ts]
var str: string;
var bool: boolean;
var num: number;
var strOrNum: string | number;
var strOrNumOrBool: string | number | boolean;
var numOrBool: number | boolean;

// A type guard of the form !expr
// - when true, narrows the type of x by expr when false, or
// - when false, narrows the type of x by expr when true.

// !typeguard1
if (!(typeof strOrNum === "string")) {
    num === strOrNum; // number
}
else {
    str = strOrNum; // string
}
// !(typeguard1 || typeguard2)
if (!(typeof strOrNumOrBool === "string" || typeof strOrNumOrBool === "number")) {
    bool = strOrNumOrBool; // boolean
}
else {
    strOrNum = strOrNumOrBool; // string | number
}
// !(typeguard1) || !(typeguard2)
if (!(typeof strOrNumOrBool !== "string") || !(typeof strOrNumOrBool !== "number")) {
    strOrNum = strOrNumOrBool; // string | number
}
else {
    bool = strOrNumOrBool; // boolean
}
// !(typeguard1 && typeguard2)
if (!(typeof strOrNumOrBool !== "string" && typeof strOrNumOrBool !== "number")) {
    strOrNum = strOrNumOrBool; // string | number
}
else {
    bool = strOrNumOrBool; // boolean
}
// !(typeguard1) && !(typeguard2)
if (!(typeof strOrNumOrBool === "string") && !(typeof strOrNumOrBool === "number")) {
    bool = strOrNumOrBool; // boolean
}
else {
    strOrNum = strOrNumOrBool; // string | number
}
// !(typeguard1) && simpleExpr
if (!(typeof strOrNumOrBool === "string") && numOrBool !== strOrNumOrBool) {
    numOrBool = strOrNumOrBool; // number | boolean
}
else {
    var r1: string | number | boolean = strOrNumOrBool; // string | number | boolean
}

//// [typeGuardOfFormNotExpr.js]
var str;
var bool;
var num;
var strOrNum;
var strOrNumOrBool;
var numOrBool;
// A type guard of the form !expr
// - when true, narrows the type of x by expr when false, or
// - when false, narrows the type of x by expr when true.
// !typeguard1
if (!(typeof strOrNum === "string")) {
    num === strOrNum; // number
}
else {
    str = strOrNum; // string
}
// !(typeguard1 || typeguard2)
if (!(typeof strOrNumOrBool === "string" || typeof strOrNumOrBool === "number")) {
    bool = strOrNumOrBool; // boolean
}
else {
    strOrNum = strOrNumOrBool; // string | number
}
// !(typeguard1) || !(typeguard2)
if (!(typeof strOrNumOrBool !== "string") || !(typeof strOrNumOrBool !== "number")) {
    strOrNum = strOrNumOrBool; // string | number
}
else {
    bool = strOrNumOrBool; // boolean
}
// !(typeguard1 && typeguard2)
if (!(typeof strOrNumOrBool !== "string" && typeof strOrNumOrBool !== "number")) {
    strOrNum = strOrNumOrBool; // string | number
}
else {
    bool = strOrNumOrBool; // boolean
}
// !(typeguard1) && !(typeguard2)
if (!(typeof strOrNumOrBool === "string") && !(typeof strOrNumOrBool === "number")) {
    bool = strOrNumOrBool; // boolean
}
else {
    strOrNum = strOrNumOrBool; // string | number
}
// !(typeguard1) && simpleExpr
if (!(typeof strOrNumOrBool === "string") && numOrBool !== strOrNumOrBool) {
    numOrBool = strOrNumOrBool; // number | boolean
}
else {
    var r1 = strOrNumOrBool; // string | number | boolean
}
