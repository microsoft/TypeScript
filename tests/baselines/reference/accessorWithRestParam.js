//// [accessorWithRestParam.ts]
class C {
    set X(...v) { }
    static set X(...v2) { }
}

//// [accessorWithRestParam.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "X", {
        set: function () { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "X", {
        set: function () { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
