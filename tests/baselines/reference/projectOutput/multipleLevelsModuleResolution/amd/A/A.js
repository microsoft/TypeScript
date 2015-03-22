define(["require", "exports"], function (require, exports) {
    var A = (function () {
        function A() {
        }
        A.prototype.A = function () {
            return "hello from A";
        };
        return A;
    })();
    exports.A = A;
});
