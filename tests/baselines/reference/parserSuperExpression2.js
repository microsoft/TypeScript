//// [parserSuperExpression2.ts]
class C {
  M() {
    super<T>(0);
  }
}

//// [parserSuperExpression2.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.M = function () {
        _this = _super.call(this, 0) || this;
    };
    return C;
}());
