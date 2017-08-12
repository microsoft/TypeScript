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
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "bar", {
        /**
         * @type {number}
         */
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    return C;
}());
