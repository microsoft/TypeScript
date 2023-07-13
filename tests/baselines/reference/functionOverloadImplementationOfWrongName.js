//// [tests/cases/compiler/functionOverloadImplementationOfWrongName.ts] ////

//// [functionOverloadImplementationOfWrongName.ts]
function foo(x);
function foo(x, y);
function bar() { }

//// [functionOverloadImplementationOfWrongName.js]
function bar() { }
