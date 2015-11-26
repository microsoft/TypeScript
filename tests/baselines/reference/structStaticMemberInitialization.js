//// [structStaticMemberInitialization.ts]
// doc 4.1
// ok

struct C {
    static x = 1;
}

var c = new C();
var r = C.x;

//// [structStaticMemberInitialization.js]
// doc 4.1
// ok
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
    return C;
})();
var c = new C();
var r = C.x;
