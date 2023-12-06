//// [tests/cases/compiler/accessorWithoutBody2.ts] ////

//// [accessorWithoutBody2.ts]
var v = { set foo(a) }

//// [accessorWithoutBody2.js]
var v = { set foo(a) { } };
