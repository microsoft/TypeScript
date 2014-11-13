//// [invocationExpressionInFunctionParameter.ts]
function foo1(val: string) {
}
function foo3(x = foo1(123)) { //should error, 123 is not string
}

//// [invocationExpressionInFunctionParameter.js]
function foo1(val) {
}
function foo3() {
    var x = (arguments[0] === void 0) ? foo1(123) : arguments[0];
}
