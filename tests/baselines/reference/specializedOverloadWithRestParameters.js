//// [specializedOverloadWithRestParameters.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base() {
    }
    Base.prototype.foo = function () {
    };
    return Base;
})();
var Derived1 = (function (_super) {
    __extends(Derived1, _super);
    function Derived1() {
        _super.apply(this, arguments);
    }
    Derived1.prototype.bar = function () {
    };
    return Derived1;
})(Base);

function f(tagName) {
    return null;
}

function g(tagName) {
    return null;
}
