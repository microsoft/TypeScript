//// [functionOverloadImplementationOfWrongName2.ts]
function foo(x);
function bar() { }
function foo(x, y);

//// [functionOverloadImplementationOfWrongName2.js]
function bar() { }
