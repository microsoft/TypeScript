//// [tests/cases/conformance/types/tuple/emptyTuples/emptyTuplesTypeAssertion01.ts] ////

//// [emptyTuplesTypeAssertion01.ts]
let x = <[]>[];
let y = x[0];

//// [emptyTuplesTypeAssertion01.js]
var x = [];
var y = x[0];


//// [emptyTuplesTypeAssertion01.d.ts]
declare let x: [];
declare let y: undefined;
