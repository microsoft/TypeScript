//// [tests/cases/compiler/functionExpressionWithResolutionOfTypeOfSameName02.ts] ////

//// [functionExpressionWithResolutionOfTypeOfSameName02.ts]
interface Foo {
}

var x = function Foo() {
    var x: Foo;
}

//// [functionExpressionWithResolutionOfTypeOfSameName02.js]
var x = function Foo() {
    var x;
};
