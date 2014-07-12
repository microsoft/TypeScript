//// [getAndSetNotIdenticalType3.js]
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
        set: function (v) {
            this.data = v;
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();

var x = new C();
var r = x.x;
x.x = r;
