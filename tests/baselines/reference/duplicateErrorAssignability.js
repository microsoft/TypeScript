//// [tests/cases/compiler/duplicateErrorAssignability.ts] ////

//// [duplicateErrorAssignability.ts]
interface A {
    x: number;
}
interface B {
    y: string;
}

declare let b: B;
declare let a: A;
const x = a = b;
let obj: { 3: string } = { 3: "three" };
obj[x];

//// [duplicateErrorAssignability.js]
"use strict";
var x = a = b;
var obj = { 3: "three" };
obj[x];
