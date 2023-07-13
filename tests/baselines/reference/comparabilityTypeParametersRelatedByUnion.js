//// [tests/cases/compiler/comparabilityTypeParametersRelatedByUnion.ts] ////

//// [comparabilityTypeParametersRelatedByUnion.ts]
class C<T> {
  constructor(readonly x: T) {}

  good<U extends T>(y: U) {
      if (y === this.x) {}
  }

  bad<U extends T | string>(y: U) {
      if (y === this.x) {}
  }
}


//// [comparabilityTypeParametersRelatedByUnion.js]
var C = /** @class */ (function () {
    function C(x) {
        this.x = x;
    }
    C.prototype.good = function (y) {
        if (y === this.x) { }
    };
    C.prototype.bad = function (y) {
        if (y === this.x) { }
    };
    return C;
}());
