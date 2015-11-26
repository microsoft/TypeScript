//// [derivedStructWithPrivateInstanceShadowingPublicInstance.ts]
// doc 2.3

struct Base {
    public fn(): string {
        return '';
    }
}

// error, not a subtype
struct Derived extends Base {
    private fn(): string {
        return '';
    }
}

var b: Base;
var d: Derived;

var r1 = b.fn(); // ok
var r2 = d.fn(); // error
var r3 = (<Base>d).fn; // ok

//// [derivedStructWithPrivateInstanceShadowingPublicInstance.js]
// doc 2.3
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
    _Base.prototype.fn = function () {
        return '';
    };
    return Base;
})();
// error, not a subtype
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
    _Derived.prototype.fn = function () {
        return '';
    };
    return Derived;
})();
var b;
var d;
var r1 = b.fn(); // ok
var r2 = d.fn(); // error
var r3 = d.fn; // ok
