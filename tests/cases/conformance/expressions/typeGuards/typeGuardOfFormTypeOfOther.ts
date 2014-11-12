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
var emptyObj: {};
var c: C;

// A type guard of the form typeof x === s, 
// where s is a string literal with any value but 'string', 'number' or 'boolean',
//  - when true, removes the primitive types string, number, and boolean from the type of x, or
//  - when false, has no effect on the type of x.

if (typeof strOrNumOrBool === "Object") {
    emptyObj = strOrNumOrBool; // {}
}
else {
    var r1: string | number | boolean = strOrNumOrBool; // string | number | boolean
}
if (typeof strOrC === "Object") {
    c = strOrC; // C
}
else {
    var r2: string | C = strOrC; // string | C
}
if (typeof numOrC === "Object") {
    c = numOrC; // C
}
else {
    var r3: number | C = numOrC; // number | C
}
if (typeof boolOrC === "Object") {
    c = boolOrC; // C
}
else {
    var r4: boolean | C = boolOrC; // boolean | C
}

// A type guard of the form typeof x !== s, where s is a string literal,
//  - when true, narrows the type of x by typeof x === s when false, or
//  - when false, narrows the type of x by typeof x === s when true.
if (typeof strOrNumOrBool !== "Object") {
    var r1: string | number | boolean = strOrNumOrBool; // string | number | boolean
}
else {
    emptyObj = strOrNumOrBool; // {}
}
if (typeof strOrC !== "Object") {
    var r2: string | C = strOrC; // string | C
}
else {
    c = strOrC; // C
}
if (typeof numOrC !== "Object") {
    var r3: number | C = numOrC; // number | C
}
else {
    c = numOrC; // C
}
if (typeof boolOrC !== "Object") {
    var r4: boolean | C = boolOrC; // boolean | C
}
else {
    c = boolOrC; // C
}