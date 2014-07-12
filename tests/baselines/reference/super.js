//// [super.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base() {
        var x;
    }
    Base.prototype.foo = function () {
        return "base";
    };

    Base.prototype.bar = function () {
        return "basebar";
    };
    return Base;
})();

var Sub1 = (function (_super) {
    __extends(Sub1, _super);
    function Sub1() {
        _super.apply(this, arguments);
    }
    Sub1.prototype.foo = function () {
        return "sub1" + _super.prototype.foo.call(this) + _super.prototype.bar.call(this);
    };
    return Sub1;
})(Base);

var SubSub1 = (function (_super) {
    __extends(SubSub1, _super);
    function SubSub1() {
        _super.apply(this, arguments);
    }
    SubSub1.prototype.foo = function () {
        return "subsub1" + _super.prototype.foo.call(this);
    };
    return SubSub1;
})(Sub1);

var Base2 = (function () {
    function Base2() {
    }
    Base2.prototype.foo = function () {
        _super.prototype.foo.call(this);
    };
    return Base2;
})();

var s = new Sub1();
var ss = new SubSub1();
s.foo() + ss.foo();
