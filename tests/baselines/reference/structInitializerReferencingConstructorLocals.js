//// [structInitializerReferencingConstructorLocals.ts]
// doc 4.1
// Initializer expressions for instance member variables are evaluated in the scope of the
// struct constructor body but are not permitted to reference parameters or local variables
// of the constructor.

struct C {
    a = z; // error
    b: typeof z; // error
    c = this.z; // error
    d: typeof this.z; // error
    constructor(x) {
        z = 1;
    }
}

/* struct D<T> {
    a = z; // error
    b: typeof z; // error
    c = this.z; // error
    d: typeof this.z; // error
    constructor(x: T) {
        z = 1;
    }
} */

//// [structInitializerReferencingConstructorLocals.js]
// doc 4.1
// Initializer expressions for instance member variables are evaluated in the scope of the
// struct constructor body but are not permitted to reference parameters or local variables
// of the constructor.
var C = (function () {
    var _C = new TypedObject.StructType({
        a: TypedObject.Any,
        b: TypedObject.Any,
        c: TypedObject.Any,
        d: TypedObject.Any,
    });
    function _ctor(x) {
        z = 1;
    }
    function C(x) {
        var obj = new _C();
        _ctor.call(obj ,);
        return obj;
    }
    C._TO = _C;
    return C;
})();
/* struct D<T> {
    a = z; // error
    b: typeof z; // error
    c = this.z; // error
    d: typeof this.z; // error
    constructor(x: T) {
        z = 1;
    }
} */ 
