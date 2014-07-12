//// [genericGetter3.js]
var A = (function () {
    function A() {
    }
    return A;
})();

var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();

var c = new C();
var r = c.x;
