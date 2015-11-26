//// [structConstructorDefaultValuesReferencingThis.ts]
// doc 3.1
// 'this' cannot be referenced in constructor arguments

struct C {
    constructor(x = this) { } // error
}

/* struct D<T> {
    constructor(x = this) { } // error
}

struct E<T> {
    constructor(public x = this) { } // error
}*/

//// [structConstructorDefaultValuesReferencingThis.js]
// doc 3.1
// 'this' cannot be referenced in constructor arguments
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor(x) {
        if (x === void 0) { x = this; }
    } // error
    function C(x) {
        var obj = new _C();
        _ctor.call(obj ,);
        return obj;
    }
    C._TO = _C;
    return C;
})();
/* struct D<T> {
    constructor(x = this) { } // error
}

struct E<T> {
    constructor(public x = this) { } // error
}*/ 
