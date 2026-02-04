//// [tests/cases/conformance/types/tuple/emptyTuples/emptyTuplesTypeAssertion02.ts] ////

//// [emptyTuplesTypeAssertion02.ts]
let x = [] as [];
let y = x[0];

//// [emptyTuplesTypeAssertion02.js]
"use strict";
let x = [];
let y = x[0];


//// [emptyTuplesTypeAssertion02.d.ts]
declare let x: [];
declare let y: undefined;
