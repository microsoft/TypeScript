//// [thisWhenTypeCheckFails.js]
var c = (function () {
    function c() {
    }
    c.prototype.n = function () {
        var _this = this;
        var k = function () {
            var s = _this.n();
        };
    };
    return c;
})();
