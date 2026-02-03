//// [tests/cases/compiler/destructuringTuple.ts] ////

//// [destructuringTuple.ts]
declare var tuple: [boolean, number, ...string[]];

const [a, b, c, ...rest] = tuple;

declare var receiver: typeof tuple;

[...receiver] = tuple;

// Repros from #32140

const [oops1] = [1, 2, 3].reduce((accu, el) => accu.concat(el), []);

const [oops2] = [1, 2, 3].reduce((acc: number[], e) => acc.concat(e), []);


//// [destructuringTuple.js]
"use strict";
var a = tuple[0], b = tuple[1], c = tuple[2], rest = tuple.slice(3);
receiver = tuple.slice(0);
// Repros from #32140
var oops1 = [1, 2, 3].reduce(function (accu, el) { return accu.concat(el); }, [])[0];
var oops2 = [1, 2, 3].reduce(function (acc, e) { return acc.concat(e); }, [])[0];
