//// [tests/cases/conformance/types/typeAliases/circularTypeAliasForUnionWithInterface.ts] ////

//// [circularTypeAliasForUnionWithInterface.ts]
var v0: T0;
type T0 = string | I0;
interface I0 {
    x: T0;
}

var v1: T1;
type T1 = string | I1;
interface I1 {
    (): T1;
}

var v2: T2;
type T2 = string | I2;
interface I2 {
    new (): T2;
}

var v3: T3;
type T3 = string | I3;
interface I3 {
    [x: number]: T3;
}

var v4: T4;
type T4 = string | I4;
interface I4 {
    [x: string]: T4;
}


//// [circularTypeAliasForUnionWithInterface.js]
var v0;
var v1;
var v2;
var v3;
var v4;
