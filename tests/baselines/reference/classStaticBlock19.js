//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock19.ts] ////

//// [classStaticBlock19.ts]
class C {
    @decorator
    static {
        // something
    }
}


//// [classStaticBlock19.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
(function () {
    // something
})();
