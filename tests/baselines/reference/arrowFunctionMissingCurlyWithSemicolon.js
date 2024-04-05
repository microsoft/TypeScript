//// [tests/cases/compiler/arrowFunctionMissingCurlyWithSemicolon.ts] ////

//// [arrowFunctionMissingCurlyWithSemicolon.ts]
// Should error at semicolon.
var f = () => ;
var b = 1 * 2 * 3 * 4;
var square = (x: number) => x * x;

//// [arrowFunctionMissingCurlyWithSemicolon.js]
// Should error at semicolon.
var f = function () { return ; };
var b = 1 * 2 * 3 * 4;
var square = function (x) { return x * x; };
