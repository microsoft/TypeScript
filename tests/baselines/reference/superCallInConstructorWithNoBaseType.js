//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/superCallInConstructorWithNoBaseType.ts] ////

//// [superCallInConstructorWithNoBaseType.ts]
class C {
    constructor() {
        super(); // error
    }
}

class D<T> {
    public constructor(public x: T) {
        super(); // error
    }
}

//// [superCallInConstructorWithNoBaseType.js]
var C = /** @class */ (function () {
    function C() {
        return _super.call(this) || this; // error
    }
    return C;
}());
var D = /** @class */ (function () {
    function D(x) {
        var _this = _super.call(this) || this; // error
        this.x = x;
        return _this;
    }
    return D;
}());
