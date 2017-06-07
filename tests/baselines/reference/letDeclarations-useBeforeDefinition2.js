//// [tests/cases/compiler/letDeclarations-useBeforeDefinition2.ts] ////

//// [file1.ts]
l;

//// [file2.ts]
const l = 0;

//// [out.js]
l;
const l = 0;
