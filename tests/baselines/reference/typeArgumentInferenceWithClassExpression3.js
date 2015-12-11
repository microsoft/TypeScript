//// [typeArgumentInferenceWithClassExpression3.ts]
function foo<T>(x = class { prop: T }): T {
    return undefined;
}

foo(class { prop = "hello" }).length;

//// [typeArgumentInferenceWithClassExpression3.js]
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
        this.prop = "hello";
    }
    return class_2;
}())).length;
