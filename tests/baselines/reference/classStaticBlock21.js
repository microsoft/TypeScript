//// [classStaticBlock21.ts]
class C {
    /* jsdocs */
    static {
        // something
    }
}


//// [classStaticBlock21.js]
var _C__;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
/* jsdocs */
_C__ = { value: (function () {
        // something
    })() };
