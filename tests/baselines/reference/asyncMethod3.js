//// [asyncMethod3.ts]
class C {
  f(await = await) {
  }
}

//// [asyncMethod3.js]
var C = (function () {
    function C() {
    }
    C.prototype.f = function (await) {
        if (await === void 0) { await = await; }
    };
    return C;
})();
