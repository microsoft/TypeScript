//// [commentOnClassAccessor1.ts]
class C {
  /**
   * @type {number}
   */
  get bar(): number { return 1;}
}

//// [commentOnClassAccessor1.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "bar", {
        /**
         * @type {number}
         */
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    return C;
}());
