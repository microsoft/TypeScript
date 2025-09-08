//// [tests/cases/conformance/es6/classExpressions/typeArgumentInferenceWithClassExpression1.ts] ////

//// [typeArgumentInferenceWithClassExpression1.ts]
function foo<T>(x = class { static prop: T }): T {
    return undefined;
}

foo(class { static prop = "hello" }).length;

//// [typeArgumentInferenceWithClassExpression1.js]
function foo(x = class {
    static prop;
}) {
    return undefined;
}
foo(class {
    static prop = "hello";
}).length;
