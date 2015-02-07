//// [emitRestParametersFunctionExpression.ts]
var funcExp = (...rest) => { }
var funcExp1 = (X: number, ...rest) => { }
var funcExp2 = function (...rest) { }
var funcExp3 = (function (...rest) { })()


//// [emitRestParametersFunctionExpression.js]
var funcExp = function () { };
var funcExp1 = function (X) { };
var funcExp2 = function () { };
var funcExp3 = (function () { })();
