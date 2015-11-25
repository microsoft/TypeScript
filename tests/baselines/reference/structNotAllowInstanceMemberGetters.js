//// [structNotAllowInstanceMemberGetters.ts]
// doc 2.2
// Due to Typed Objects being nonextensible and non-configurable, accessors are not allowed.

struct C {
    private _foo: string;

    get foo() { // error, getters are not allowed in struct
        return this._foo;
    }
}

//// [structNotAllowInstanceMemberGetters.js]
// doc 2.2
// Due to Typed Objects being nonextensible and non-configurable, accessors are not allowed.
var C = (function () {
    var _C = new TypedObject.StructType({
        _foo: TypedObject.string
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
get;
foo();
{
    return this._foo;
}
