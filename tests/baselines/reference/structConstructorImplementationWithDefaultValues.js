//// [structConstructorImplementationWithDefaultValues.ts]
// doc3.1

struct C {
    constructor(x);
    constructor(x = 1) {
        var y = x;
    }
}

/* struct D<T> {
    constructor(x);
    constructor(x:T = null) {
        var y = x;
    }
}

struct E<T extends Date> {
    constructor(x);
    constructor(x: T = null) {
        var y = x;
    }
} */

//// [structConstructorImplementationWithDefaultValues.js]
// doc3.1
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor(x) {
        if (x === void 0) { x = 1; }
        var y = x;
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
    constructor(x);
    constructor(x:T = null) {
        var y = x;
    }
}

struct E<T extends Date> {
    constructor(x);
    constructor(x: T = null) {
        var y = x;
    }
} */ 
