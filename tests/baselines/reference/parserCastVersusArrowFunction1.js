//// [tests/cases/conformance/parser/ecmascript5/Generics/parserCastVersusArrowFunction1.ts] ////

//// [parserCastVersusArrowFunction1.ts]
var v = <T>() => 1;
var v = <T>a;

var v = <T>(a) => 1;
var v = <T>(a, b) => 1;
var v = <T>(a = 1, b = 2) => 1;

var v = <T>(a);
var v = <T>(a, b);
var v = <T>(a = 1, b = 2);

//// [parserCastVersusArrowFunction1.js]
var v = function () { return 1; };
var v = a;
var v = function (a) { return 1; };
var v = function (a, b) { return 1; };
var v = function (a, b) {
    if (a === void 0) { a = 1; }
    if (b === void 0) { b = 2; }
    return 1;
};
var v = (a);
var v = (a, b);
var v = (a = 1, b = 2);
