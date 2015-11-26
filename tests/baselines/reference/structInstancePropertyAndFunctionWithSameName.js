//// [structInstancePropertyAndFunctionWithSameName.ts]
// doc 4
// Instance property member declarations declare properties in the struct instance type,
// and must specify names that are unique among all instance property member
// and parameter property declarations in the containing struct.

struct C {
    x: number;
    x() { // error
        return 1;
    }
}

struct D {
    x: number;
    x(v) { } // error
}

struct E {
    x: number;
    constructor(private x: string) {}
}

//// [structInstancePropertyAndFunctionWithSameName.js]
// doc 4
// Instance property member declarations declare properties in the struct instance type,
// and must specify names that are unique among all instance property member
// and parameter property declarations in the containing struct.
var C = (function () {
    var _C = new TypedObject.StructType({
        x: TypedObject.float64,
    });
    function _ctor() {
    }
    function C() {
        var obj = new _C();
        _ctor.call(obj);
        return obj;
    }
    C._TO = _C;
    _C.prototype.x = function () {
        return 1;
    };
    return C;
})();
var D = (function () {
    var _D = new TypedObject.StructType({
        x: TypedObject.float64,
    });
    function _ctor() {
    }
    function D() {
        var obj = new _D();
        _ctor.call(obj);
        return obj;
    }
    D._TO = _D;
    _D.prototype.x = function (v) { }; // error
    return D;
})();
var E = (function () {
    var _E = new TypedObject.StructType({
        x: TypedObject.float64,
    });
    function _ctor(x) {
        this.x = x;
    }
    function E(x) {
        var obj = new _E();
        _ctor.call(obj ,);
        return obj;
    }
    E._TO = _E;
    return E;
})();
