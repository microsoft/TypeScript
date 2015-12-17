//// [staticGetter1.ts]
// once caused stack overflow
class C {
    static get x() {
        return this;
    }
}


//// [staticGetter1.js]
// once caused stack overflow
var C = (function () {
    function C() {
    }
    Object.defineProperty(C, "x", {
        get: function () {
            return this;
        },
        enumerable: true,
        configurable: true
    });
    return C;
}());
