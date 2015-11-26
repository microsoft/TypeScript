//// [structInitializerReferencingConstructorParameters.ts]
// doc 4.1
// Initializer expressions for instance member variables are evaluated in the scope of the struct constructor body but are not permitted to reference parameters or local variables of the constructor.

struct C {
    a = x; // error
    b: typeof x; // error
    constructor(x) { }
}

struct D {
    a = x; // error
    b: typeof x; // error
    constructor(public x) { }
}

struct E {
    a = this.x; // ok
    b: typeof this.x; // error
    constructor(public x) { }
}

/* struct F<T> {
    a = this.x; // ok
    b = x; // error
    constructor(public x: T) { }
}*/

//// [structInitializerReferencingConstructorParameters.js]
// doc 4.1
// Initializer expressions for instance member variables are evaluated in the scope of the struct constructor body but are not permitted to reference parameters or local variables of the constructor.
var C = (function () {
    var _C = new TypedObject.StructType({
        a: TypedObject.Any,
        b: TypedObject.Any,
    });
    function _ctor(x) {
    }
    function C(x) {
        var obj = new _C();
        _ctor.call(obj ,);
        return obj;
    }
    C._TO = _C;
    return C;
})();
var D = (function () {
    var _D = new TypedObject.StructType({
        a: TypedObject.Any,
        b: TypedObject.Any,
    });
    function _ctor(x) {
        this.x = x;
    }
    function D(x) {
        var obj = new _D();
        _ctor.call(obj ,);
        return obj;
    }
    D._TO = _D;
    return D;
})();
var E = (function () {
    var _E = new TypedObject.StructType({
        a: TypedObject.Any,
        b: TypedObject.Any,
    });
    function _ctor(x) {
        this.x = x;
    }
    function E(x) {
        var obj = new _E();
        _ctor.call(obj ,);
        return obj;
    }
    E._TO = _E;
    return E;
})();
/* struct F<T> {
    a = this.x; // ok
    b = x; // error
    constructor(public x: T) { }
}*/ 
