//// [emitRestParametersFunctionExpressionES6.ts]
var funcExp = (...rest) => { }
var funcExp1 = (X: number, ...rest) => { }
var funcExp2 = function (...rest) { }
var funcExp3 = (function (...rest) { })()

//// [emitRestParametersFunctionExpressionES6.js]
var funcExp = function (...rest) {
};
var funcExp1 = function (X, ...rest) {
};
var funcExp2 = function (...rest) {
};
var funcExp3 = (function (...rest) {
})();
