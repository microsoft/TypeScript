//// [derivedStructSuperCallsInNonConstructorMembers.ts]
// doc 3.2
// error to use super calls outside a constructor or in nested functions inside constructors

struct Base {
    x: string;
}

struct Derived extends Base {
    a: super(); // error
    b() {
        super(); // error
    }

    static a: super(); // error
    static b() {
        super(); // error
    }
}

//// [derivedStructSuperCallsInNonConstructorMembers.js]
// doc 3.2
// error to use super calls outside a constructor or in nested functions inside constructors
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    var _Base = new TypedObject.StructType({
        x: TypedObject.string
    });
    function _ctor() {
    }
    function Base() {
        var obj = new _Base();
        _ctor.call(obj);
        return obj;
    }
    Base._TO = _Base;
    return Base;
})();
var Derived = (function () {
    var _Derived = new TypedObject.StructType({
        a: TypedObject.Any,
    });
    function _ctor() {
    }
    function Derived() {
        var obj = new _Derived();
        _ctor.call(obj);
        return obj;
    }
    Derived._TO = _Derived;
    _Derived.prototype.b = function () {
        _super.call(this); // error
    };
    _Derived.b = function () {
        _super.call(this); // error
    };
    return Derived;
})();
