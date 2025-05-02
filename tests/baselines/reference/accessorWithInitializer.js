//// [tests/cases/compiler/accessorWithInitializer.ts] ////

//// [accessorWithInitializer.ts]
class C {
    set X(v = 0) { }
    static set X(v2 = 0) { }
}

//// [accessorWithInitializer.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "X", {
        set: function (v) {
            if (v === void 0) { v = 0; }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "X", {
        set: function (v2) {
            if (v2 === void 0) { v2 = 0; }
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
