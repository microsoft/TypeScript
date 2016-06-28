//// [classExpression5.ts]
new class {
    hi() {
        return "Hi!";
    }
}().hi();

//// [classExpression5.js]
new (function () {
    function class_1() {
    }
    class_1.prototype.hi = function () {
        return "Hi!";
    };
    return class_1;
}())().hi();
