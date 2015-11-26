//// [structDerivedTypeAccessesHiddenBaseCallViaSuperPropertyAccess.ts]
// doc 4.2
// A member function can access overridden base struct members using a super property access.

struct Base {
    foo(x: { a: number }): { a: number } {
        return null;
    }
}

struct Derived extends Base {
    foo(x: { a: number; b: number }): { a: number; b: number } {
        return null;
    }

    bar() {
        var r = super.foo({ a: 1 }); // { a: number }
		var r2 = this.foo({a: 1}); // error, Argument of type '{ a: number; }' is not assignable to parameter of type '{ a: number; b: number; }'.
        var r3 = super.foo({ a: 1, b: 2 }); // { a: number }
        var r4 = this.foo({ a: 1, b: 2 }); // { a: number; b: number; }
    }
}

//// [structDerivedTypeAccessesHiddenBaseCallViaSuperPropertyAccess.js]
// doc 4.2
// A member function can access overridden base struct members using a super property access.
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    var _Base = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function Base() {
        var obj = new _Base();
        _ctor.call(obj);
        return obj;
    }
    Base._TO = _Base;
    _Base.prototype.foo = function (x) {
        return null;
    };
    return Base;
})();
var Derived = (function () {
    var _Derived = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function Derived() {
        var obj = new _Derived();
        _ctor.call(obj);
        return obj;
    }
    Derived._TO = _Derived;
    _Derived.prototype.foo = function (x) {
        return null;
    };
    _Derived.prototype.bar = function () {
        var r = _super.prototype.foo.call(this, { a: 1 }); // { a: number }
        var r2 = this.foo({ a: 1 }); // error, Argument of type '{ a: number; }' is not assignable to parameter of type '{ a: number; b: number; }'.
        var r3 = _super.prototype.foo.call(this, { a: 1, b: 2 }); // { a: number }
        var r4 = this.foo({ a: 1, b: 2 }); // { a: number; b: number; }
    };
    return Derived;
})();
