//// [setterWithReturn.js]
var C234 = (function () {
    function C234() {
    }
    Object.defineProperty(C234.prototype, "p1", {
        set: function (arg1) {
            if (true) {
                return arg1;
            } else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    return C234;
})();
