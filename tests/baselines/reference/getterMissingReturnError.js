//// [getterMissingReturnError.js]
var test = (function () {
    function test() {
    }
    Object.defineProperty(test.prototype, "p2", {
        get: function () {
        },
        enumerable: true,
        configurable: true
    });
    return test;
})();
