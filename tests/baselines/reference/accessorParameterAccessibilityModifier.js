//// [accessorParameterAccessibilityModifier.ts]
class C {
    set X(public v) { }
    static set X(public v2) { }
}

//// [accessorParameterAccessibilityModifier.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "X", {
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C, "X", {
        set: function (v2) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());
