//// [classStaticBlock1.ts]
const a = 2;

class C {
    static {
        const a = 1;

        a;
    }
}


//// [classStaticBlock1.js]
var a = 2;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
(function () {
    var a = 1;
    a;
})();
