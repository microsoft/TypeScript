//// [tests/cases/conformance/parser/ecmascript5/SuperExpressions/parserSuperExpression2.ts] ////

//// [parserSuperExpression2.ts]
class C {
  M() {
    super<T>(0);
  }
}

//// [parserSuperExpression2.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.M = function () {
        _this = _super.call(this, 0) || this;
    };
    return C;
}());
