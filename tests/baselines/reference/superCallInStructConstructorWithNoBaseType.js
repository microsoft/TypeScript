//// [superCallInStructConstructorWithNoBaseType.ts]
// doc 3.2
// 'super' can only be referenced in a derived struct

struct C {
    constructor() {
        super(); // error
    }
}

/* struct D<T> {
    public constructor(public x: T) {
        super(); // error
    }
} */

//// [superCallInStructConstructorWithNoBaseType.js]
// doc 3.2
// 'super' can only be referenced in a derived struct
var C = (function () {
    var _C = new TypedObject.StructType({
    });
    function _ctor() {
        _super.call(this); // error
    }
    function C() {
        var obj = new _C();
        _ctor.call(obj);
        return obj;
    }
    C._TO = _C;
    return C;
})();
/* struct D<T> {
    public constructor(public x: T) {
        super(); // error
    }
} */ 
