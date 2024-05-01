//// [tests/cases/compiler/noEmitOnError.ts] ////

//// [noEmitOnError.ts]
var x: number = "";




!!!! File noEmitOnError.d.ts missing from original emit, but present in noCheck emit
//// [noEmitOnError.d.ts]
declare var x: number;
