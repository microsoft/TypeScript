//// [InterfaceNotExtendingStruct.ts]
struct S {
	bar: string;
}

interface I extends S {
}


//// [InterfaceNotExtendingStruct.js]
var S = (function () {
    var _S = new TypedObject.StructType({
        bar: TypedObject.string
    });
    function _ctor() {
    }
    function S() {
        var obj = new _S();
        _ctor.call(obj);
        return obj;
    }
    S._TO = _S;
    return S;
})();
