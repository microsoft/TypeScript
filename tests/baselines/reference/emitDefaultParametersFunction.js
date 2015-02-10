//// [emitDefaultParametersFunction.ts]
function foo(x: string, y = 10) { }
function baz(x: string, y = 5, ...rest) { }
function bar(y = 10) { }
function bar1(y = 10, ...rest) { }

//// [emitDefaultParametersFunction.js]
function foo(x, y) { }
function baz(x, y) { }
function bar(y) { }
function bar1(y) { }
