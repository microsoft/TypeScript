//// [classStaticBlock19.ts]
class C {
    @decorator
    static {
        // something
    }
}


//// [classStaticBlock19.js]
var _C__;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
_C__ = { value: (function () {
        // something
    })() };
