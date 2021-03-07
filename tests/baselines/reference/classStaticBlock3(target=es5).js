//// [classStaticBlock3.ts]
const a = 1;

class C {
    static f1 = 1;

    static {
        console.log(C.f1, C.f2, C.f3)
    }

    static f2 = 2;

    static {
        console.log(C.f1, C.f2, C.f3)
    }

    static f3 = 3;
}


//// [classStaticBlock3.js]
var a = 1;
var C = /** @class */ (function () {
    function C() {
    }
    C.f1 = 1;
    C.f2 = 2;
    C.f3 = 3;
    return C;
}());
