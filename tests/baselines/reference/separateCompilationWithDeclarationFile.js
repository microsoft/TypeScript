//// [tests/cases/compiler/separateCompilationWithDeclarationFile.ts] ////

//// [file1.d.ts]

declare function foo(): void;

//// [file1.ts]
export var x;

//// [file1.js]
export var x;
