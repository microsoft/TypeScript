//// [invocationExpressionInFunctionParameter.ts]
function foo1(val: string) {
}
function foo3(x = foo1(123)) { //should error, 123 is not string
}

//// [invocationExpressionInFunctionParameter.js]
function foo1(val) {
}
function foo3(x) { //should error, 123 is not string
    if (x === void 0) { x = foo1(123); }
}
