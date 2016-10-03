//// [genericCallWithFunctionReturnLiteral.ts]
function foo<T>(t: T) { return t; }

foo(() => 123)


//// [genericCallWithFunctionReturnLiteral.js]
function foo(t) { return t; }
foo(function () { return 123; });
