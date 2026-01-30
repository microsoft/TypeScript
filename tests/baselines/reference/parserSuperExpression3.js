//// [tests/cases/conformance/parser/ecmascript5/SuperExpressions/parserSuperExpression3.ts] ////

//// [parserSuperExpression3.ts]
class C {
  M() {
    this.super<T>(0);
  }
}

//// [parserSuperExpression3.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.M = function () {
        this.super(0);
    };
    return C;
}());
