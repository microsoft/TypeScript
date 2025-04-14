//// [tests/cases/compiler/redeclarationOfVarWithGenericType.ts] ////

//// [redeclarationOfVarWithGenericType.ts]
var a1: { fn<T>(x: T): T };
var a1: { fn<T>(x: T): T };

//// [redeclarationOfVarWithGenericType.js]
var a1;
var a1;
