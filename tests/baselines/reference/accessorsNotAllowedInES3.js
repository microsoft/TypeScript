//// [accessorsNotAllowedInES3.ts]
class C {
    get x(): number { return 1; }
}
var y = { get foo() { return 3; } };


//// [accessorsNotAllowedInES3.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    return C;
}());
var y = { get foo() { return 3; } };
