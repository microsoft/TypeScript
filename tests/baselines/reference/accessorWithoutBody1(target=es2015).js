//// [tests/cases/compiler/accessorWithoutBody1.ts] ////

//// [accessorWithoutBody1.ts]
var v = { get foo() }

//// [accessorWithoutBody1.js]
var v = { get foo() { } };
