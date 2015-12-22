//// [thisInInstanceMemberInitializer.ts]
class C {
    x = this;
}

class D<T> {
    x = this;
    y: T;
}

//// [thisInInstanceMemberInitializer.js]
var C = (function () {
    function C() {
        this.x = this;
    }
    return C;
}());
var D = (function () {
    function D() {
        this.x = this;
    }
    return D;
}());
