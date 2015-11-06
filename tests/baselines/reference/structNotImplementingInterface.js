//// [structNotImplementingInterface.ts]
interface C {
	foo: string;
}

struct D implements C { // error. struct cannot implement interface
	foo: string;
}


//// [structNotImplementingInterface.js]
var D = (function () {
    var _D = new TypedObject.StructType({
        foo: TypedObject.string
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
