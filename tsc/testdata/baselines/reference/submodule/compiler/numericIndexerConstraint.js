//// [tests/cases/compiler/numericIndexerConstraint.ts] ////

//// [numericIndexerConstraint.ts]
class C {
    0: number;
    [x: number]: RegExp;
}

//// [numericIndexerConstraint.js]
"use strict";
class C {
    0;
}
