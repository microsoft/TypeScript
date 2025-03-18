//// [tests/cases/conformance/expressions/typeGuards/typeGuardOfFormTypeOfNumber.ts] ////

//// [typeGuardOfFormTypeOfNumber.ts]
class C { private p: string };

var str: string;
var bool: boolean;
var num: number;
var strOrNum: string | number;
var strOrBool: string | boolean;
var numOrBool: number | boolean
var strOrNumOrBool: string | number | boolean;
var strOrC: string | C;
var numOrC: number | C;
var boolOrC: boolean | C;
var c: C;

//	A type guard of the form typeof x === s, 
//  where s is a string literal with the value 'string', 'number', or 'boolean',
//  - when true, narrows the type of x to the given primitive type, or
//  - when false, removes the primitive type from the type of x.
if (typeof strOrNum === "number") {
    num = strOrNum; // number
}
else {
    str === strOrNum; // string
}
if (typeof numOrBool === "number") {
    num = numOrBool; // number
}
else {
    var x: number | boolean = numOrBool; // number | boolean
}
if (typeof strOrNumOrBool === "number") {
    num = strOrNumOrBool; // number
}
else {
    strOrBool = strOrNumOrBool; // string | boolean
}
if (typeof numOrC === "number") {
    num = numOrC; // number
}
else {
    c = numOrC; // C
}

if (typeof strOrBool === "number") {
    let y1: {} = strOrBool; // {}
}
else {
    let y2: string | boolean = strOrBool; // string | boolean
}

// A type guard of the form typeof x !== s, where s is a string literal,
//  - when true, narrows the type of x by typeof x === s when false, or
//  - when false, narrows the type of x by typeof x === s when true.
if (typeof strOrNum !== "number") {
    str === strOrNum; // string
}
else {
    num = strOrNum; // number
}
if (typeof numOrBool !== "number") {
    var x: number | boolean = numOrBool; // number | boolean
}
else {
    num = numOrBool; // number
}
if (typeof strOrNumOrBool !== "number") {
    strOrBool = strOrNumOrBool; // string | boolean
}
else {
    num = strOrNumOrBool; // number
}
if (typeof numOrC !== "number") {
    c = numOrC; // C
}
else {
    num = numOrC; // number
}

if (typeof strOrBool !== "number") {
    let y1: string | boolean = strOrBool; // string | boolean
}
else {
    let y2: {} = strOrBool; // {}
}


//// [typeGuardOfFormTypeOfNumber.js]
class C {
    p;
}
;
var str;
var bool;
var num;
var strOrNum;
var strOrBool;
var numOrBool;
var strOrNumOrBool;
var strOrC;
var numOrC;
var boolOrC;
var c;
if (typeof strOrNum === "number") {
    num = strOrNum;
}
else {
    str === strOrNum;
}
if (typeof numOrBool === "number") {
    num = numOrBool;
}
else {
    var x = numOrBool;
}
if (typeof strOrNumOrBool === "number") {
    num = strOrNumOrBool;
}
else {
    strOrBool = strOrNumOrBool;
}
if (typeof numOrC === "number") {
    num = numOrC;
}
else {
    c = numOrC;
}
if (typeof strOrBool === "number") {
    let y1 = strOrBool;
}
else {
    let y2 = strOrBool;
}
if (typeof strOrNum !== "number") {
    str === strOrNum;
}
else {
    num = strOrNum;
}
if (typeof numOrBool !== "number") {
    var x = numOrBool;
}
else {
    num = numOrBool;
}
if (typeof strOrNumOrBool !== "number") {
    strOrBool = strOrNumOrBool;
}
else {
    num = strOrNumOrBool;
}
if (typeof numOrC !== "number") {
    c = numOrC;
}
else {
    num = numOrC;
}
if (typeof strOrBool !== "number") {
    let y1 = strOrBool;
}
else {
    let y2 = strOrBool;
}
