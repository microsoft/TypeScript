define(["require", "exports", "../A/A"], function (require, exports, A) {
    var B = (function () {
        function B() {
        }
        B.prototype.Create = function () {
            return new A.A();
        };
        return B;
    })();
    exports.B = B;
});
