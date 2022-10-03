//// [parserSuperExpression3.ts]
class C {
  M() {
    this.super<T>(0);
  }
}

//// [parserSuperExpression3.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.M = function () {
        this["super"](0);
    };
    return C;
}());
