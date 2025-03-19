//// [tests/cases/compiler/emptyTypeArgumentList.ts] ////

//// [emptyTypeArgumentList.ts]
function foo<T>() { }
foo<>();

// https://github.com/microsoft/TypeScript/issues/33041
function noParams() {}
noParams<>();

//// [emptyTypeArgumentList.js]
function foo() { }
foo();
// https://github.com/microsoft/TypeScript/issues/33041
function noParams() { }
noParams();
