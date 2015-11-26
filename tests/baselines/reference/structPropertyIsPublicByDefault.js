//// [structPropertyIsPublicByDefault.ts]
// doc 2.2
// all ok

struct C {
    x: string;
    foo() { }

    static a: string;
    static foo() { }
}

var c: C;
c.x;
c.foo();

C.a;
C.foo();

//// [structPropertyIsPublicByDefault.js]
// doc 2.2
// all ok
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
    _C.prototype.foo = function () { };
    _C.foo = function () { };
    return C;
})();
var c;
c.x;
c.foo();
C.a;
C.foo();
