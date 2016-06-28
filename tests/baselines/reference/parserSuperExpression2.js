//// [parserSuperExpression2.ts]
class C {
  M() {
    super<T>(0);
  }
}

//// [parserSuperExpression2.js]
var C = (function () {
    function C() {
    }
    C.prototype.M = function () {
        _super.prototype..call(this, 0);
    };
    return C;
}());
