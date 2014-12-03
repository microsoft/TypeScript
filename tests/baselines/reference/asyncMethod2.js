//// [asyncMethod2.ts]
class C {
  f(await) {
  }
}

//// [asyncMethod2.js]
var C = (function () {
    function C() {
    }
    C.prototype.f = function (await) {
    };
    return C;
})();
