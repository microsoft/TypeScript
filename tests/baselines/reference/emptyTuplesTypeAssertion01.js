//// [emptyTuplesTypeAssertion01.ts]

let x = <[]>[];
let y = x[0];

//// [emptyTuplesTypeAssertion01.js]
var x = [];
var y = x[0];


//// [emptyTuplesTypeAssertion01.d.ts]
declare let x: [];
declare let y: never;


//// [DtsFileErrors]


tests/cases/conformance/types/tuple/emptyTuples/emptyTuplesTypeAssertion01.d.ts(1,16): error TS1122: A tuple type element list cannot be empty.


==== tests/cases/conformance/types/tuple/emptyTuples/emptyTuplesTypeAssertion01.d.ts (1 errors) ====
    declare let x: [];
                   ~~
!!! error TS1122: A tuple type element list cannot be empty.
    declare let y: never;
    