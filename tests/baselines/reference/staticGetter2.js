//// [staticGetter2.ts]
// once caused stack overflow
class C {
    static x() {
        var r = this;
        return this;
    }
}

//// [staticGetter2.js]
// once caused stack overflow
var C = /** @class */ (function () {
    function C() {
    }
    C.x = function () {
        var r = this;
        return this;
    };
    return C;
}());
