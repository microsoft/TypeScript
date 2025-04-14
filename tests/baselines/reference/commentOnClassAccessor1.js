//// [tests/cases/compiler/commentOnClassAccessor1.ts] ////

//// [commentOnClassAccessor1.ts]
class C {
  /**
   * @type {number}
   */
  get bar(): number { return 1;}
}

//// [commentOnClassAccessor1.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "bar", {
        /**
         * @type {number}
         */
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    return C;
}());
