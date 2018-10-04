//// [tests/cases/compiler/constDeclarations-useBeforeDefinition2.ts] ////

//// [file1.ts]
c;

//// [file2.ts]
const c = 0;

//// [out.js]
c;
const c = 0;
