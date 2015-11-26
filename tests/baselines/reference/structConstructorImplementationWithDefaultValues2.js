//// [structConstructorImplementationWithDefaultValues2.ts]
// doc 3.1

struct C {
    constructor(x);
    constructor(public x: string = 1) { // error, Type 'number' is not assignable to type 'string'
        var y = x;
    }
}

/* struct D<T, U> {
    constructor(x: T, y: U);
    constructor(x: T = 1, public y: U = x) { // error, Type 'number' is not assignable to type 'T'.
											//  Type 'T' is not assignable to type 'U'
        var z = x;
    }
}

struct E<T extends Date> {
    constructor(x);
    constructor(x: T = new Date()) { // error, Type 'Date' is not assignable to type 'T'
        var y = x;
    }
} */

//// [structConstructorImplementationWithDefaultValues2.js]
// doc 3.1
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor(x) {
        if (x === void 0) { x = 1; }
        this.x = x;
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
/* struct D<T, U> {
    constructor(x: T, y: U);
    constructor(x: T = 1, public y: U = x) { // error, Type 'number' is not assignable to type 'T'.
                                            //  Type 'T' is not assignable to type 'U'
        var z = x;
    }
}

struct E<T extends Date> {
    constructor(x);
    constructor(x: T = new Date()) { // error, Type 'Date' is not assignable to type 'T'
        var y = x;
    }
} */ 
