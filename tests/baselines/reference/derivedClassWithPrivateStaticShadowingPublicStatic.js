//// [derivedClassWithPrivateStaticShadowingPublicStatic.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base() {
    }
    Base.fn = function () {
        return '';
    };

    Object.defineProperty(Base, "a", {
        get: function () {
            return 1;
        },
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return Base;
})();

// BUG 847404
// should be error
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
    }
    Derived.fn = function () {
        return '';
    };

    Object.defineProperty(Derived, "a", {
        get: function () {
            return 1;
        },
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return Derived;
})(Base);

var r = Base.x;
var r2 = Derived.x;

var r3 = Base.fn();
var r4 = Derived.fn();

var r5 = Base.a;
Base.a = 2; // ok

var r6 = Derived.a;
Derived.a = 2; // error
