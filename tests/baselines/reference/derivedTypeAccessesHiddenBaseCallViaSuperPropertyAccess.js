//// [derivedTypeAccessesHiddenBaseCallViaSuperPropertyAccess.ts]
class Base {
    foo(x: { a: number }): { a: number } {
        return null;
    }
}

class Derived extends Base {
    foo(x: { a: number; b: number }): { a: number; b: number } {
        return null;
    }

    bar() {
        var r = super.foo({ a: 1 }); // { a: number }
        var r2 = super.foo({ a: 1, b: 2 }); // { a: number }
        var r3 = this.foo({ a: 1, b: 2 }); // { a: number; b: number; }
    }
}

//// [derivedTypeAccessesHiddenBaseCallViaSuperPropertyAccess.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    Base.prototype.foo = function (x) {
        return null;
    };
    return Base;
})();
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
    }
    Derived.prototype.foo = function (x) {
        return null;
    };
    Derived.prototype.bar = function () {
        var r = _super.prototype.foo.call(this, { a: 1 }); // { a: number }
        var r2 = _super.prototype.foo.call(this, { a: 1, b: 2 }); // { a: number }
        var r3 = this.foo({ a: 1, b: 2 }); // { a: number; b: number; }
    };
    return Derived;
})(Base);
