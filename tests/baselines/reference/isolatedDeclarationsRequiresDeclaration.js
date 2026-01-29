//// [tests/cases/compiler/isolatedDeclarationsRequiresDeclaration.ts] ////

//// [file1.ts]
export var x = 1;
//// [file2.ts]
export var y = 1;

//// [file1.js]
export var x = 1;
//// [file2.js]
export var y = 1;
