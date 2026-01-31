//// [tests/cases/conformance/es6/restParameters/emitRestParametersFunctionExpression.ts] ////

//// [emitRestParametersFunctionExpression.ts]
var funcExp = (...rest) => { }
var funcExp1 = (X: number, ...rest) => { }
var funcExp2 = function (...rest) { }
var funcExp3 = (function (...rest) { })()


//// [emitRestParametersFunctionExpression.js]
var funcExp = (...rest) => { };
var funcExp1 = (X, ...rest) => { };
var funcExp2 = function (...rest) { };
var funcExp3 = (function (...rest) { })();
