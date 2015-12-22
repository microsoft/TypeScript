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
        _super.call(this); // error
    }
    return C;
}());
var D = (function () {
    function D(x) {
        this.x = x;
        _super.call(this); // error
    }
    return D;
}());
