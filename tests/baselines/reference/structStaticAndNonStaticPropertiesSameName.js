//// [structStaticAndNonStaticPropertiesSameName.ts]
// doc 4
// the declaration spaces of instance and static property members are separate.
// Thus, it is possible to have instance and static property members with the same name
// ok

struct C {
    x: number;
    static x: number;

    f() { }
    static f() { }
}

//// [structStaticAndNonStaticPropertiesSameName.js]
// doc 4
// the declaration spaces of instance and static property members are separate.
// Thus, it is possible to have instance and static property members with the same name
// ok
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
    _C.prototype.f = function () { };
    _C.f = function () { };
    return C;
})();
