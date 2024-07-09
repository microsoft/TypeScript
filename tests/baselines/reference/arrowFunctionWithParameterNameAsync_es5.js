//// [tests/cases/conformance/async/es5/asyncArrowFunction/arrowFunctionWithParameterNameAsync_es5.ts] ////

//// [arrowFunctionWithParameterNameAsync_es5.ts]
const x = async => async;

//// [arrowFunctionWithParameterNameAsync_es5.js]
var x = function (async) { return async; };
