//// [tests/cases/conformance/types/tuple/emptyTuples/emptyTuplesTypeAssertion01.ts] ////

//// [emptyTuplesTypeAssertion01.ts]
let x = <[]>[];
let y = x[0];

//// [emptyTuplesTypeAssertion01.js]
let x = [];
let y = x[0];
