//// [classStaticBlock21.ts]
class C {
    /* jsdocs */
    static {
        // something
    }
}


//// [classStaticBlock21.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
/* jsdocs */
(function () {
    // something
})();
