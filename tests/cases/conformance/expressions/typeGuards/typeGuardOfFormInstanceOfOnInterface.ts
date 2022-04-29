// A type guard of the form x instanceof C, where C is of a subtype of the global type 'Function' 
// and C has a property named 'prototype'
//  - when true, narrows the type of x to the type of the 'prototype' property in C provided 
//    it is a subtype of the type of x, or
//  - when false, has no effect on the type of x.

interface C1 {
    (): C1;
    prototype: C1;
    p1: string;
}
interface C2 {
    (): C2;
    prototype: C2;
    p2: number;
}
interface D1 extends C1 {
    prototype: D1;
    p3: number;
}
var str: string;
var num: number;
var strOrNum: string | number;

var c1: C1;
var c2: C2;
var d1: D1;
var c1Orc2: C1 | C2;
str = c1Orc2 instanceof c1 && c1Orc2.p1; // C1
num = c1Orc2 instanceof c2 && c1Orc2.p2; // C2
str = c1Orc2 instanceof d1 && c1Orc2.p1; // C1
num = c1Orc2 instanceof d1 && c1Orc2.p3; // D1

var c2Ord1: C2 | D1;
num = c2Ord1 instanceof c2 && c2Ord1.p2; // C2
num = c2Ord1 instanceof d1 && c2Ord1.p3; // D1
str = c2Ord1 instanceof d1 && c2Ord1.p1; // D1
var r2: D1 | C2 = c2Ord1 instanceof c1 && c2Ord1; // C2 | D1