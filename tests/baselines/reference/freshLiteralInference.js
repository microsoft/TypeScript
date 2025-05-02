//// [tests/cases/compiler/freshLiteralInference.ts] ////

//// [freshLiteralInference.ts]
declare function f1<T extends "1" | "2" | "3">(x: T): T;

const value = f1("1");  // regular "1"
let x1 = value;  // regular "1"

declare function f2<T extends "1" | "2" | "3">(x: { value: T }): { value: T };

const obj2 = f2({ value: "1" });  // { value: regular "1" }
let x2 = obj2.value;  // regular "1"

declare function f3<T extends { value: "1" | "2" | "3" }>(obj: T): T;

const obj3 = f3({ value: "1" });  // before: { value: fresh "1" }
let x3 = obj3.value;  // before: string, after: "1"


//// [freshLiteralInference.js]
var value = f1("1"); // regular "1"
var x1 = value; // regular "1"
var obj2 = f2({ value: "1" }); // { value: regular "1" }
var x2 = obj2.value; // regular "1"
var obj3 = f3({ value: "1" }); // before: { value: fresh "1" }
var x3 = obj3.value; // before: string, after: "1"
