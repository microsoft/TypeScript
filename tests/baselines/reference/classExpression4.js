//// [classExpression4.ts]
let C = class {
    foo() {
        return new C();
    }
};
let x = (new C).foo();


//// [classExpression4.js]
var C = (function () {
    function class_1() {
    }
    class_1.prototype.foo = function () {
        return new C();
    };
    return class_1;
}());
var x = (new C).foo();
