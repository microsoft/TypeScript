//// [structNotAllowStaticMemberSetters.ts]
// doc 2.2
// Due to Typed Objects being nonextensible and non-configurable, accessors are not allowed.

struct C {
    static _bar: number;

	static set bar(new_bar: number) { // error, setters are not allowed in struct
		C._bar = new_bar;
	}
}

//// [structNotAllowStaticMemberSetters.js]
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
        set: function (new_bar) {
            C._bar = new_bar;
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();
