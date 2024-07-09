//// [tests/cases/compiler/letInNonStrictMode.ts] ////

//// [letInNonStrictMode.ts]
let [x] = [1];
let {a: y} = {a: 1};

//// [letInNonStrictMode.js]
var x = [1][0];
var y = { a: 1 }.a;
