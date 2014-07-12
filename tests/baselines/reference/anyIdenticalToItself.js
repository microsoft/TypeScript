//// [anyIdenticalToItself.js]
function foo(x, y) {
}

var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "X", {
        get: function () {
            var y;
            return y;
        },
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();
