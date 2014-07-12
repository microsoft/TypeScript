//// [illegalSuperCallsInConstructor.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base() {
    }
    return Base;
})();

var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = this;
        var r2 = function () {
            return _super.prototype();
        };
        var r3 = function () {
            _super.prototype();
        };
        var r4 = function () {
            _super.prototype();
        };
        var r5 = {
            get foo() {
                _super.prototype();
                return 1;
            },
            set foo(v) {
                _super.prototype();
            }
        };
    }
    return Derived;
})(Base);
