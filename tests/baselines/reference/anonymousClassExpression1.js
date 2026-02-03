//// [tests/cases/compiler/anonymousClassExpression1.ts] ////

//// [anonymousClassExpression1.ts]
function f() {
    return typeof class {} === "function";
}

//// [anonymousClassExpression1.js]
function f() {
    return typeof /** @class */ (function () {
        function class_1() {
        }
        return class_1;
    }()) === "function";
}
