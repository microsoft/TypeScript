//// [functionExpressionWithResolutionOfTypeNamedArguments01.ts]
interface arguments {
}

var x = function f() {
    <arguments>arguments;
}

//// [functionExpressionWithResolutionOfTypeNamedArguments01.js]
var x = function f() {
    arguments;
};
