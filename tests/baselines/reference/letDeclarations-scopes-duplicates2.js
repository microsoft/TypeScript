//// [tests/cases/compiler/letDeclarations-scopes-duplicates2.ts] ////

//// [file1.ts]
let var1 = 0;

//// [file2.ts]
let var1 = 0;

//// [file1.js]
let var1 = 0;
//// [file2.js]
let var1 = 0;
