//// [structStaticPropertyAndFunctionWithSameName.ts]
// doc 4
// Static property member declarations declare properties in the constructor function type,
// and must specify names that are unique among all static property member declarations
// in the containing struct

struct C {
    static f: number;
    static f() {} // error
}

struct D {
	f: number;
    static f: number;
}

//// [structStaticPropertyAndFunctionWithSameName.js]
// doc 4
// Static property member declarations declare properties in the constructor function type,
// and must specify names that are unique among all static property member declarations
// in the containing struct
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C() {
        var obj = new _C();
        _ctor.call(obj);
        return obj;
    }
    C._TO = _C;
    _C.f = function () { }; // error
    return C;
})();
var D = (function () {
    var _D = new TypedObject.StructType({
        f: TypedObject.float64,
    });
    function _ctor() {
    }
    function D() {
        var obj = new _D();
        _ctor.call(obj);
        return obj;
    }
    D._TO = _D;
    return D;
})();
