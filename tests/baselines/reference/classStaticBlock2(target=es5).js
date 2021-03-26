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
var _C__, _C__1;
var a = 1;
var b = 2;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
_C__ = { value: (function () {
        var a_1 = 11;
        a_1;
        b;
    })() };
_C__1 = { value: (function () {
        var a_2 = 11;
        a_2;
        b;
    })() };
