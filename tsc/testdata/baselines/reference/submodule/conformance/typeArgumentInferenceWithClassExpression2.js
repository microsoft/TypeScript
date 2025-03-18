//// [tests/cases/conformance/es6/classExpressions/typeArgumentInferenceWithClassExpression2.ts] ////

//// [typeArgumentInferenceWithClassExpression2.ts]
function foo<T>(x = class { prop: T }): T {
    return undefined;
}

// Should not infer string because it is a static property
foo(class { static prop = "hello" }).length;

//// [typeArgumentInferenceWithClassExpression2.js]
function foo(x = class {
    prop;
}) {
    return undefined;
}
foo(class {
    static prop = "hello";
}).length;
