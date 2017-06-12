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
    var proto_1 = class_1.prototype;
    proto_1.foo = function () {
        return new C();
    };
    return class_1;
}());
var x = (new C).foo();
