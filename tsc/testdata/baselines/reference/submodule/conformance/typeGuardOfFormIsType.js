//// [tests/cases/conformance/expressions/typeGuards/typeGuardOfFormIsType.ts] ////

//// [typeGuardOfFormIsType.ts]
class C1 {
    p1: string;
}
class C2 {
    p2: number;
}
class D1 extends C1 {
    p3: number;
}
var str: string;
var num: number;
var strOrNum: string | number;

function isC1(x: any): x is C1 {
    return true;
}

function isC2(x: any): x is C2 {
    return true;
}

function isD1(x: any): x is D1 {
    return true;
}

var c1Orc2: C1 | C2;
str = isC1(c1Orc2) && c1Orc2.p1; // C1
num = isC2(c1Orc2) && c1Orc2.p2; // C2
str = isD1(c1Orc2) && c1Orc2.p1; // D1
num = isD1(c1Orc2) && c1Orc2.p3; // D1

var c2Ord1: C2 | D1;
num = isC2(c2Ord1) && c2Ord1.p2; // C2
num = isD1(c2Ord1) && c2Ord1.p3; // D1
str = isD1(c2Ord1) && c2Ord1.p1; // D1
var r2: C2 | D1 = isC1(c2Ord1) && c2Ord1; // C2 | D1

//// [typeGuardOfFormIsType.js]
class C1 {
    p1;
}
class C2 {
    p2;
}
class D1 extends C1 {
    p3;
}
var str;
var num;
var strOrNum;
function isC1(x) {
    return true;
}
function isC2(x) {
    return true;
}
function isD1(x) {
    return true;
}
var c1Orc2;
str = isC1(c1Orc2) && c1Orc2.p1;
num = isC2(c1Orc2) && c1Orc2.p2;
str = isD1(c1Orc2) && c1Orc2.p1;
num = isD1(c1Orc2) && c1Orc2.p3;
var c2Ord1;
num = isC2(c2Ord1) && c2Ord1.p2;
num = isD1(c2Ord1) && c2Ord1.p3;
str = isD1(c2Ord1) && c2Ord1.p1;
var r2 = isC1(c2Ord1) && c2Ord1;
