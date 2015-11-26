//// [derivedStructIncludesInheritedMembers.ts]
// doc 2.3
// A derived struct inherits all members from its base struct it doesn’t override.
// all ok

struct Base {
    a: string;
    b() { }

    static r: string;
    static s() { }

    constructor(x) { }
}

struct Derived extends Base {
}

var d: Derived = new Derived(1);
var r1 = d.a;
var r2 = d.b();
var r3 = Derived.r;
var r4 = Derived.s();


//// [derivedStructIncludesInheritedMembers.js]
// doc 2.3
// A derived struct inherits all members from its base struct it doesn’t override.
// all ok
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    var _Base = new TypedObject.StructType({
        a: TypedObject.string,
    });
    function _ctor(x) {
    }
    function Base(x) {
        var obj = new _Base();
        _ctor.call(obj ,);
        return obj;
    }
    Base._TO = _Base;
    _Base.prototype.b = function () { };
    _Base.s = function () { };
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
    return Derived;
})();
var d = new Derived(1);
var r1 = d.a;
var r2 = d.b();
var r3 = Derived.r;
var r4 = Derived.s();
