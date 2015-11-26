//// [structTypeOfThisInStaticMembers2.ts]
struct C {
    static foo = this; // error, 'this' cannot be referenced in a static property initializer.
}

/* struct C2<T> {
    static foo = this; // error
} */

//// [structTypeOfThisInStaticMembers2.js]
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
/* struct C2<T> {
    static foo = this; // error
} */ 
