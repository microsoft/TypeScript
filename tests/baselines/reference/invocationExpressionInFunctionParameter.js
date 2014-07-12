//// [invocationExpressionInFunctionParameter.js]
function foo1(val) {
}
function foo3(x) {
    if (typeof x === "undefined") { x = foo1(123); }
}
