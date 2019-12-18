//// [classExpression4.ts]
let C = class {
    foo() {
        return new C();
    }
};
let x = (new C).foo();


//// [classExpression4.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
        return new C();
    };
    return C;
}());
var x = (new C).foo();
