//// [tests/cases/conformance/es6/classExpressions/typeArgumentInferenceWithClassExpression3.ts] ////

//// [typeArgumentInferenceWithClassExpression3.ts]
function foo<T>(x = class { prop: T }): T {
    return undefined;
}

foo(class { prop = "hello" }).length;

//// [typeArgumentInferenceWithClassExpression3.js]
function foo(x = class {
}) {
    return undefined;
}
foo(class {
    constructor() {
        this.prop = "hello";
    }
}).length;
