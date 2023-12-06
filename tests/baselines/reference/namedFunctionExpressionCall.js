//// [tests/cases/compiler/namedFunctionExpressionCall.ts] ////

//// [namedFunctionExpressionCall.ts]
var recurser = function foo() {
    // using the local name
    foo();

    // using the globally visible name
    recurser();
};


(function bar() {
    bar();
});

//// [namedFunctionExpressionCall.js]
var recurser = function foo() {
    // using the local name
    foo();
    // using the globally visible name
    recurser();
};
(function bar() {
    bar();
});
