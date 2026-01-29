//// [tests/cases/compiler/assigningFunctionToTupleIssuesError.ts] ////

//// [assigningFunctionToTupleIssuesError.ts]
declare let a: () => void;
let b: [string] = a;

//// [assigningFunctionToTupleIssuesError.js]
let b = a;
