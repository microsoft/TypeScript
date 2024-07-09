//// [tests/cases/compiler/letDeclarations-scopes-duplicates3.ts] ////

//// [file1.ts]
let var1 = 0;

//// [file2.ts]
const var1 = 0;

//// [file1.js]
let var1 = 0;
//// [file2.js]
const var1 = 0;
