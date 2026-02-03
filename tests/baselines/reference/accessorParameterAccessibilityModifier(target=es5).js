//// [tests/cases/compiler/accessorParameterAccessibilityModifier.ts] ////

//// [accessorParameterAccessibilityModifier.ts]
class C {
    set X(public v) { }
    static set X(public v2) { }
}

//// [accessorParameterAccessibilityModifier.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "X", {
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "X", {
        set: function (v2) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());
