//// [structConstructorWithAssignableReturnExpression.ts]
// doc 3
// A struct constructor canot return an expression.

struct C {
    constructor() {
        return 1;  // error
    }
}

struct D {
    x: number;
    constructor() {
        return 1; // error
    }
}

struct E {
    x: number;
    constructor() {
        return { x: 1 }; // error
    }
}

/* struct F<T> {
    x: T;
    constructor() {
        return { x: 1 }; // error
    }
}

struct G<T> {
    x: T;
    constructor() {
        return { x: <T>null }; // error
    }
} */

//// [structConstructorWithAssignableReturnExpression.js]
// doc 3
// A struct constructor canot return an expression.
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor() {
        return 1; // error
    }
    function C() {
        var obj = new _C();
        _ctor.call(obj);
        return obj;
    }
    C._TO = _C;
    return C;
})();
var D = (function () {
    var _D = new TypedObject.StructType({
        x: TypedObject.float64,
    });
    function _ctor() {
        return 1; // error
    }
    function D() {
        var obj = new _D();
        _ctor.call(obj);
        return obj;
    }
    D._TO = _D;
    return D;
})();
var E = (function () {
    var _E = new TypedObject.StructType({
        x: TypedObject.float64,
    });
    function _ctor() {
        return { x: 1 }; // error
    }
    function E() {
        var obj = new _E();
        _ctor.call(obj);
        return obj;
    }
    E._TO = _E;
    return E;
})();
/* struct F<T> {
    x: T;
    constructor() {
        return { x: 1 }; // error
    }
}

struct G<T> {
    x: T;
    constructor() {
        return { x: <T>null }; // error
    }
} */ 
