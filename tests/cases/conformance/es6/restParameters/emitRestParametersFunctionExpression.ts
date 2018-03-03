// @target: es5
var funcExp = (...rest) => { rest; }
var funcExp1 = (X: number, ...rest) => { rest; }
var funcExp2 = function (...rest) { rest; }
var funcExp3 = (function (...rest) { rest; })()
var funcExp4 = (...rest) => rest;
