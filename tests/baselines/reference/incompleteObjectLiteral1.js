//// [tests/cases/compiler/incompleteObjectLiteral1.ts] ////

//// [incompleteObjectLiteral1.ts]
var tt = { aa; }
var x = tt;

//// [incompleteObjectLiteral1.js]
var tt = { aa: aa };
var x = tt;
