//// [structPrivateInstanceMemberAccessibility.ts]
// doc 2.2
// private property members can be accessed only within the struct body that contains their declaration

struct Base {
    private foo: string;
}

struct Derived extends Base {
	// error,  Only public methods of the base class are accessible via the 'super' keyword
    x = super.foo;

    y() {
        return super.foo; // error
    }
    z: typeof super.foo; // error

    a: this.foo; // error
}

//// [structPrivateInstanceMemberAccessibility.js]
// doc 2.2
// private property members can be accessed only within the struct body that contains their declaration
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    var _Base = new TypedObject.StructType({
        foo: TypedObject.string
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
        x: TypedObject.string,
        z: TypedObject.Any,
        a: TypedObject.Object,
        foo: TypedObject.Any
    });
    function _ctor() {
    }
    function Derived() {
        var obj = new _Derived();
        _ctor.call(obj);
        return obj;
    }
    Derived._TO = _Derived;
    _Derived.prototype.y = function () {
        return _super.prototype.foo; // error
    };
    return Derived;
})();
