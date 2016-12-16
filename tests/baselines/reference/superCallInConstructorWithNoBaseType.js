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
var C = (function () {
    function C() {
        _this = _super.call(this) || this; // error
    }
    return C;
}());
var D = (function () {
    function D(x) {
        _this = _super.call(this) || this; // error
        this.x = x;
    }
    return D;
}());
