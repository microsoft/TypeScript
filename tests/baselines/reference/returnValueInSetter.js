//// [returnValueInSetter.js]
var f = (function () {
    function f() {
    }
    Object.defineProperty(f.prototype, "x", {
        set: function (value) {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return f;
})();
