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
if (typeof strOrNum === "string") {
    str = strOrNum; // string
}
else {
    num === strOrNum; // number
}
if (typeof strOrBool === "string") {
    str = strOrBool; // string
}
else {
    bool = strOrBool; // boolean
}
if (typeof numOrBool === "string") {
    str = numOrBool; // string
}
else {
    var x : number | boolean =  numOrBool; // number | boolean
}
if (typeof strOrNumOrBool === "string") {
    str = strOrNumOrBool; // string
}
else {
    numOrBool = strOrNumOrBool; // number | boolean
}
if (typeof strOrC === "string") {
    str = strOrC; // string
}
else {
    c = strOrC; // C
}

// A type guard of the form typeof x !== s, where s is a string literal,
//  - when true, narrows the type of x by typeof x === s when false, or
//  - when false, narrows the type of x by typeof x === s when true.
if (typeof strOrNum !== "string") {
    num === strOrNum; // number
}
else {
    str = strOrNum; // string
}
if (typeof strOrBool !== "string") {
    bool = strOrBool; // boolean
}
else {
    str = strOrBool; // string
}
if (typeof numOrBool !== "string") {
    var x: number | boolean = numOrBool; // number | boolean
}
else {
    str = numOrBool; // string
}
if (typeof strOrNumOrBool !== "string") {
    numOrBool = strOrNumOrBool; // number | boolean
}
else {
    str = strOrNumOrBool; // string
}
if (typeof strOrC !== "string") {
    c = strOrC; // C
}
else {
    str = strOrC; // string
}