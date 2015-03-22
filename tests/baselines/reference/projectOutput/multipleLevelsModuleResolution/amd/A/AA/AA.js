define(["require", "exports"], function (require, exports) {
    var AA = (function () {
        function AA() {
        }
        AA.prototype.A = function () {
            return "hello from AA";
        };
        return AA;
    })();
    exports.AA = AA;
});
