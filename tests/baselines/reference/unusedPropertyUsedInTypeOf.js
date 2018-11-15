//// [unusedPropertyUsedInTypeOf.ts]
class C {
    private static readonly x: number;
    m(p: typeof C.x) { return p; }
}


//// [unusedPropertyUsedInTypeOf.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function (p) { return p; };
    return C;
}());
