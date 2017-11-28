//// [emitRestParametersFunctionExpressionES6.ts]
var funcExp = (...rest) => { }
var funcExp1 = (X: number, ...rest) => { }
var funcExp2 = function (...rest) { }
var funcExp3 = (function (...rest) { })()
var funcExp4 = (...rest) => rest;


//// [emitRestParametersFunctionExpressionES6.js]
var funcExp = (...rest) => { };
var funcExp1 = (X, ...rest) => { };
var funcExp2 = function (...rest) { };
var funcExp3 = (function (...rest) { })();
var funcExp4 = (...rest) => rest;
