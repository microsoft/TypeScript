//// [superCallOutsideConstructor.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
    };
    return C;
})();

var D = (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = this;
        _super.call(this);
        this.x = _super.call(this);

        var y = function () {
            _super.prototype();
        };

        var y2 = function () {
            _super.prototype();
        };
    }
    return D;
})(C);

var d = new D();
