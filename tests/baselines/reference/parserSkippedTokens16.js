//// [tests/cases/conformance/parser/ecmascript5/SkippedTokens/parserSkippedTokens16.ts] ////

//// [parserSkippedTokens16.ts]
foo(): Bar { }
function Foo      () ¬   { }
4+:5
module M {
function a(
    : T) { }
}
var x       =

//// [parserSkippedTokens16.js]
foo();
Bar;
{ }
function Foo() { }
{ }
4 + ;
5;
var M;
(function (M) {
    function a(T) { }
})(M || (M = {}));
var x = ;
