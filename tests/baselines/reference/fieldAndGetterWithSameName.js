//// [fieldAndGetterWithSameName.js]
define(["require", "exports"], function(require, exports) {
    var C = (function () {
        function C() {
        }
        Object.defineProperty(C.prototype, "x", {
            get: function () {
                return 1;
            },
            enumerable: true,
            configurable: true
        });
        return C;
    })();
    exports.C = C;
});
