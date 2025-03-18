//// [tests/cases/compiler/numericIndexerConstraint.ts] ////

//// [numericIndexerConstraint.ts]
class C {
    0: number;
    [x: number]: RegExp;
}

//// [numericIndexerConstraint.js]
class C {
    0;
}
