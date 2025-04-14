//// [tests/cases/compiler/optionalParamAssignmentCompat.ts] ////

//// [optionalParamAssignmentCompat.ts]
interface I1 {
    (p1: number, p2: string): void;
}
interface I2 {
    p1: I1;
    m1(p1?: string): I1;
}
var i2: I2;
var c: I1 = i2.p1; // should be ok
var d: I1 = i2.m1; // should error


//// [optionalParamAssignmentCompat.js]
var i2;
var c = i2.p1; // should be ok
var d = i2.m1; // should error
