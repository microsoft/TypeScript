//// [classStaticBlock2.ts]
const a = 1;
const b = 2;

class C {
    static {
        const a = 11;

        a;
        b;
    }

    static {
        const a = 11;

        a;
        b;
    }
}


//// [classStaticBlock2.js]
var a = 1;
var b = 2;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
(function () {
    var a = 11;
    a;
    b;
})();
(function () {
    var a = 11;
    a;
    b;
})();
