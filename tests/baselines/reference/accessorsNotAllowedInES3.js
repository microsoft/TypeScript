//// [accessorsNotAllowedInES3.ts]
class C {
    get x(): number { return 1; }
}
var y = { get foo() { return 3; } };


//// [accessorsNotAllowedInES3.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    return C;
}());
var y = { get foo() { return 3; } };
