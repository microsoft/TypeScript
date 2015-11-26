//// [structStaticFactory1.ts]
// doc 4.2
// In a static member function, this represents the constructor function object on which
// the static member function was invoked. Thus, a call to ‘new this()’ may actually invoke
// a derived struct constructor.
// ok
struct Base {
    foo() { return 1; }
    static create() {
        return new this();
    }
}

struct Derived extends Base {
    foo() { return 2; }
}
var d = Derived.create(); // new B()
d.foo(); // 2

//// [structStaticFactory1.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// doc 4.2
// In a static member function, this represents the constructor function object on which
// the static member function was invoked. Thus, a call to ‘new this()’ may actually invoke
// a derived struct constructor.
// ok
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
    _Base.prototype.foo = function () { return 1; };
    _Base.create = function () {
        return new this();
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
    _Derived.prototype.foo = function () { return 2; };
    return Derived;
})();
var d = Derived.create(); // new B()
d.foo(); // 2
