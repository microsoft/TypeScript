//// [typeSatisfaction.ts]
interface I1 {
    a: number;
}

type T1 = {
    a: "a" | "b";
}

type T2 = (x: string) => void;

const a1 = { a: 1 } satisfies I1; // Ok
const a2 = { a: 1, b: 1 } satisfies I1; // Error
const a3 = { } satisfies I1; // Error

const a4: T1 = { a: "a" } satisfies T1; // Ok
const a5 = (m => m.substring(0)) satisfies T2; // Ok


//// [typeSatisfaction.js]
var a1 = { a: 1 }; // Ok
var a2 = { a: 1, b: 1 }; // Error
var a3 = {}; // Error
var a4 = { a: "a" }; // Ok
var a5 = (function (m) { return m.substring(0); }); // Ok
