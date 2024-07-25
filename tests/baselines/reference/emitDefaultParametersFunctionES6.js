//// [tests/cases/conformance/es6/defaultParameters/emitDefaultParametersFunctionES6.ts] ////

//// [emitDefaultParametersFunctionES6.ts]
function foo(x: string, y = 10) { }
function baz(x: string, y = 5, ...rest) { }
function bar(y = 10) { }
function bar1(y = 10, ...rest) { }

//// [emitDefaultParametersFunctionES6.js]
function foo(x, y = 10) { }
function baz(x, y = 5, ...rest) { }
function bar(y = 10) { }
function bar1(y = 10, ...rest) { }
