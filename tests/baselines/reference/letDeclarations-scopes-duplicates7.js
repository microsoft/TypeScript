//// [tests/cases/compiler/letDeclarations-scopes-duplicates7.ts] ////

//// [file1.ts]
let var1 = 0;

//// [file2.ts]
var var1 = 0;

//// [file1.js]
let var1 = 0;
//// [file2.js]
var var1 = 0;
