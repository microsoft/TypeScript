//// [tests/cases/compiler/restParameterNotLast.ts] ////

//// [restParameterNotLast.ts]
function f(...x, y) { }

//// [restParameterNotLast.js]
function f(y) { }
