//// [tests/cases/compiler/objectCreationExpressionInFunctionParameter.ts] ////

//// [objectCreationExpressionInFunctionParameter.ts]
class A {
    constructor(public a1: string) {
    }
}
function foo(x = new A(123)) { //should error, 123 is not string
}}

//// [objectCreationExpressionInFunctionParameter.js]
class A {
    constructor(a1) {
        this.a1 = a1;
    }
}
function foo(x = new A(123)) {
}
