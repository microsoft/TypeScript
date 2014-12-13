//// [asyncGetter2.ts]
class C {
  get await() {
  }
}

//// [asyncGetter2.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "await", {
        get: function () {
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();
