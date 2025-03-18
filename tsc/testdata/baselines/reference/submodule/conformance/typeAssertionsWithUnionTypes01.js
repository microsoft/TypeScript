//// [tests/cases/conformance/types/typeRelationships/comparable/typeAssertionsWithUnionTypes01.ts] ////

//// [typeAssertionsWithUnionTypes01.ts]
interface I1 {
    p1: number
}

interface I2 extends I1 {
    p2: number;
}

var x = { p1: 10, p2: 20 };
var y: number | I2 = x;
var z: I1 = x;

var a = <number | I2>z;
var b = <number>z;
var c = <I2>z;
var d = <I1>y;


//// [typeAssertionsWithUnionTypes01.js]
var x = { p1: 10, p2: 20 };
var y = x;
var z = x;
var a = z;
var b = z;
var c = z;
var d = y;
