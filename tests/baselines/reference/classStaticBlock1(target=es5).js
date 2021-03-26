//// [classStaticBlock1.ts]
const a = 2;

class C {
    static {
        const a = 1;

        a;
    }
}


//// [classStaticBlock1.js]
var _C__;
var a = 2;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
_C__ = { value: (function () {
        var a_1 = 1;
        a_1;
    })() };
