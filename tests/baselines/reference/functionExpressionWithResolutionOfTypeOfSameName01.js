//// [tests/cases/compiler/functionExpressionWithResolutionOfTypeOfSameName01.ts] ////

//// [functionExpressionWithResolutionOfTypeOfSameName01.ts]
interface f {
}

var x = function f() {
    <f>f;
}

//// [functionExpressionWithResolutionOfTypeOfSameName01.js]
"use strict";
var x = function f() {
    f;
};
