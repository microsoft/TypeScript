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
        set: function () {
            var v = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                v[_i] = arguments[_i];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C, "X", {
        set: function () {
            var v2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                v2[_i] = arguments[_i];
            }
        },
        enumerable: true,
        configurable: true
    });
    return C;
}());
