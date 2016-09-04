//// [objectCreationExpressionInFunctionParameter.ts]
class A {
    constructor(public a1: string) {
    }
}
function foo(x = new A(123)) { //should error, 123 is not string
}}

//// [objectCreationExpressionInFunctionParameter.js]
var A = (function () {
    function A(a1) {
        this.a1 = a1;
    }
    return A;
}());
function foo(x) { //should error, 123 is not string
    if (x === void 0) { x = new A(123); }
}
