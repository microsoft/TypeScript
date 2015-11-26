//// [structPropertyNotAllowProtected.ts]
// doc 2.2
// no protected property members in struct.

struct C {
    protected x: string; // error
    protected foo() { } // error

    protected static a: string; // error
    protected static foo() { } // error
}

//// [structPropertyNotAllowProtected.js]
// doc 2.2
// no protected property members in struct.
var C = (function () {
    var _C = new TypedObject.StructType({
        x: TypedObject.string,
    });
    function _ctor() {
    }
    function C() {
        var obj = new _C();
        _ctor.call(obj);
        return obj;
    }
    C._TO = _C;
    _C.prototype.foo = function () { }; // error
    _C.foo = function () { }; // error
    return C;
})();
