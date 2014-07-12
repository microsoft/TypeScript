//// [derivedClassConstructorWithoutSuperCall.js]
// derived class constructors must contain a super call
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
    }
    return Derived;
})(Base);

var Base2 = (function () {
    function Base2() {
    }
    return Base2;
})();

var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        var _this = this;
        var r2 = function () {
            return _super.prototype();
        };
    }
    return Derived2;
})(Base2);

var Derived3 = (function (_super) {
    __extends(Derived3, _super);
    function Derived3() {
        var r = function () {
            _super.prototype();
        };
    }
    return Derived3;
})(Base2);

var Derived4 = (function (_super) {
    __extends(Derived4, _super);
    function Derived4() {
        var r = _super.call(this);
    }
    return Derived4;
})(Base2);
