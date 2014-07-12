//// [functionAndPropertyNameConflict.js]
var C65 = (function () {
    function C65() {
    }
    C65.prototype.aaaaa = function () {
    };
    Object.defineProperty(C65.prototype, "aaaaa", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    return C65;
})();
