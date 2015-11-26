//// [structNotAllowStaticMemberGetters.ts]
// doc 2.2
// Due to Typed Objects being nonextensible and non-configurable, accessors are not allowed.

struct C {
	static _bar: number;

	static get bar() { // error, getters are not allowed in struct
		return C._bar;
	}
}

//// [structNotAllowStaticMemberGetters.js]
// doc 2.2
// Due to Typed Objects being nonextensible and non-configurable, accessors are not allowed.
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
    Object.defineProperty(C, "bar", {
        get: function () {
            return C._bar;
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();
