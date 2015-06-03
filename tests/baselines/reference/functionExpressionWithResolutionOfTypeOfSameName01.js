//// [functionExpressionWithResolutionOfTypeOfSameName01.ts]
interface f {
}

var x = function f() {
    <f>f;
}

//// [functionExpressionWithResolutionOfTypeOfSameName01.js]
var x = function f() {
    f;
};
