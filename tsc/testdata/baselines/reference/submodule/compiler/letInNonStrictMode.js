//// [tests/cases/compiler/letInNonStrictMode.ts] ////

//// [letInNonStrictMode.ts]
let [x] = [1];
let {a: y} = {a: 1};

//// [letInNonStrictMode.js]
let [x] = [1];
let { a: y } = { a: 1 };
