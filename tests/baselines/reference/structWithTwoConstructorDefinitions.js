//// [structWithTwoConstructorDefinitions.ts]
// doc 3
// Multiple constructor implementations are not allowed

struct C {
    constructor() { } // error
    constructor(x) { } // error
}

/* struct D<T> {
    constructor(x: T) { } // error
    constructor(x: T, y: T) { } // error
} */

//// [structWithTwoConstructorDefinitions.js]
// doc 3
// Multiple constructor implementations are not allowed
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor() {
    } // error
    function C() {
        var obj = new _C();
        _ctor.call(obj);
        return obj;
    }
    C._TO = _C;
    return C;
})();
/* struct D<T> {
    constructor(x: T) { } // error
    constructor(x: T, y: T) { } // error
} */ 
