//// [typeArgumentInferenceWithClassExpression1.ts]
function foo<T>(x = class { static prop: T }): T {
    return undefined;
}

foo(class { static prop = "hello" }).length;

//// [typeArgumentInferenceWithClassExpression1.js]
function foo(x) {
    if (x === void 0) { x = (function () {
        function class_1() {
        }
        return class_1;
    }()); }
    return undefined;
}
foo((function () {
    function class_2() {
    }
    class_2.prop = "hello";
    return class_2;
}())).length;
