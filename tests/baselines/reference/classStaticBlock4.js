//// [classStaticBlock4.ts]
class C {
    static s1 = 1;

    static {
        this.s1;
        C.s1;

        this.s2;
        C.s2;
    }

    static s2 = 2;
    static ss2 = this.s1;
}


//// [classStaticBlock4.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.s1 = 1;
    C.s2 = 2;
    C.ss2 = this.s1;
    return C;
}());
