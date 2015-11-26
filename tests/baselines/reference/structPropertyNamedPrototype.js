//// [structPropertyNamedPrototype.ts]
// doc 4
// It is an error to explicitly declare a static property member with the name ‘prototype’.

struct C {
    prototype: number; // ok
    static prototype: C; // error
}

//// [structPropertyNamedPrototype.js]
// doc 4
// It is an error to explicitly declare a static property member with the name ‘prototype’.
var C = (function () {
    var _C = new TypedObject.StructType({
        prototype: TypedObject.float64,
    });
    function _ctor() {
    }
    function C() {
        var obj = new _C();
        _ctor.call(obj);
        return obj;
    }
    C._TO = _C;
    return C;
})();
