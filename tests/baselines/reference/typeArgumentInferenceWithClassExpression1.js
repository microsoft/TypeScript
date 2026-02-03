//// [tests/cases/conformance/es6/classExpressions/typeArgumentInferenceWithClassExpression1.ts] ////

//// [typeArgumentInferenceWithClassExpression1.ts]
function foo<T>(x = class { static prop: T }): T {
    return undefined;
}

foo(class { static prop = "hello" }).length;

//// [typeArgumentInferenceWithClassExpression1.js]
var _a;
function foo(x = class {
}) {
    return undefined;
}
foo((_a = class {
    },
    _a.prop = "hello",
    _a)).length;
