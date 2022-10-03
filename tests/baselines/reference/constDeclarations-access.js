//// [tests/cases/compiler/constDeclarations-access.ts] ////

//// [file1.ts]
const x = 0

//// [file2.ts]
x++;

//// [file1.js]
const x = 0;
//// [file2.js]
x++;
