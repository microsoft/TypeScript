//// [tests/cases/conformance/expressions/assignmentOperator/assignmentTypeNarrowing.ts] ////

//// [assignmentTypeNarrowing.ts]
let x: string | number | boolean | RegExp;

x = "";
x; // string

[x] = [true];
x; // boolean

[x = ""] = [1];
x; // string | number

({x} = {x: true});
x; // boolean

({y: x} = {y: 1});
x; // number

({x = ""} = {x: true});
x; // string | boolean

({y: x = /a/} = {y: 1});
x; // number | RegExp

let a: string[];

for (x of a) {
    x; // string
}

// Repro from #26405

type AOrArrA<T> = T | T[];
const arr: AOrArrA<{x?: "ok"}> = [{ x: "ok" }]; // weak type
arr.push({ x: "ok" });


//// [assignmentTypeNarrowing.js]
let x;
x = "";
x; // string
[x] = [true];
x; // boolean
[x = ""] = [1];
x; // string | number
({ x } = { x: true });
x; // boolean
({ y: x } = { y: 1 });
x; // number
({ x = "" } = { x: true });
x; // string | boolean
({ y: x = /a/ } = { y: 1 });
x; // number | RegExp
let a;
for (x of a) {
    x; // string
}
const arr = [{ x: "ok" }]; // weak type
arr.push({ x: "ok" });
