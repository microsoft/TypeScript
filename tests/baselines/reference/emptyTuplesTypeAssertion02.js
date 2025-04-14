//// [tests/cases/conformance/types/tuple/emptyTuples/emptyTuplesTypeAssertion02.ts] ////

//// [emptyTuplesTypeAssertion02.ts]
let x = [] as [];
let y = x[0];

//// [emptyTuplesTypeAssertion02.js]
var x = [];
var y = x[0];


//// [emptyTuplesTypeAssertion02.d.ts]
declare let x: [];
declare let y: undefined;
