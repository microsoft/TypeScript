//// [tests/cases/conformance/throwExpression/throwExpression1.ts] ////

//// [throwExpression1.ts]
function f(foo = throw new TypeError("Argument required")) {}

class C {
    m(foo = throw new TypeError("Argument required")) {}
}


//// [throwExpression1.js]
function f(foo) {
    if (foo === void 0) { foo = (function () {
        throw new TypeError("Argument required");
    })(); }
}
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function (foo) {
        if (foo === void 0) { foo = (function () {
            throw new TypeError("Argument required");
        })(); }
    };
    return C;
}());
