//// [tests/cases/conformance/expressions/typeSatisfaction/typeSatisfaction.ts] ////

//// [typeSatisfaction.ts]
interface I1 {
    a: number;
}

type T1 = {
    a: "a" | "b";
}

type T2 = (x: string) => void;

const t1 = { a: 1 } satisfies I1; // Ok
const t2 = { a: 1, b: 1 } satisfies I1; // Error
const t3 = { } satisfies I1; // Error

const t4: T1 = { a: "a" } satisfies T1; // Ok
const t5 = (m => m.substring(0)) satisfies T2; // Ok

const t6 = [1, 2] satisfies [number, number];

interface A {
    a: string
}
let t7 = { a: 'test' } satisfies A;
let t8 = { a: 'test', b: 'test' } satisfies A;


//// [typeSatisfaction.js]
var t1 = { a: 1 }; // Ok
var t2 = { a: 1, b: 1 }; // Error
var t3 = {}; // Error
var t4 = { a: "a" }; // Ok
var t5 = (function (m) { return m.substring(0); }); // Ok
var t6 = [1, 2];
var t7 = { a: 'test' };
var t8 = { a: 'test', b: 'test' };
