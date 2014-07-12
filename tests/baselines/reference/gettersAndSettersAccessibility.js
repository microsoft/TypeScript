//// [gettersAndSettersAccessibility.js]
var C99 = (function () {
    function C99() {
    }
    Object.defineProperty(C99.prototype, "Baz", {
        get: function () {
            return 0;
        },
        set: function (n) {
        },
        enumerable: true,
        configurable: true
    });
    return C99;
})();
