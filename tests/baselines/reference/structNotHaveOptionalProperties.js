//// [structNotHaveOptionalProperties.ts]
/**
 * inspired by conformance/types/objectTypeLiteral/methodSignatures/objectTypesWithOptionalProperties
 */

interface I {
	x?: number; // ok
}

class C {
	x?: number; // error, cannot be declared optional
}

struct S {
	x?: number; // error, cannot be declared optional
}


//// [structNotHaveOptionalProperties.js]
/**
 * inspired by conformance/types/objectTypeLiteral/methodSignatures/objectTypesWithOptionalProperties
 */
var C = (function () {
    function C() {
    }
    return C;
})();
var S = (function () {
    var _S = new TypedObject.StructType({
        x: TypedObject.float64
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
