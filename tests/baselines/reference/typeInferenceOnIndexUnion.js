//// [tests/cases/compiler/typeInferenceOnIndexUnion.ts] ////

//// [typeInferenceOnIndexUnion.ts]
type Options = { k: "a", a: number } | { k: "b", b: string };
declare function f<T extends Options>(p: T["k"]): T;
const x = f("a");  // expect it to be `{ k: "a", a: number }`

type Options2 = { k: "a", a: number, c: {} } | { k: "b", b: string, c: {} };
declare function f2<T extends Options2>(p: T["k"], c: T["c"]): T;
const x2 = f2("a", { x: 1, y: 2 });  // expect it to be `{ k: "a", a: number, c: {x: number, y: number} }`


//// [typeInferenceOnIndexUnion.js]
var x = f("a"); // expect it to be `{ k: "a", a: number }`
var x2 = f2("a", { x: 1, y: 2 }); // expect it to be `{ k: "a", a: number, c: {x: number, y: number} }`
