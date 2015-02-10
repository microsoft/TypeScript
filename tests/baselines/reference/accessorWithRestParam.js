//// [accessorWithRestParam.ts]

class C {
    set X(...v) { }
    static set X(...v2) { }
}

//// [accessorWithRestParam.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "X", {
        set: function () { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C, "X", {
        set: function () { },
        enumerable: true,
        configurable: true
    });
    return C;
})();
