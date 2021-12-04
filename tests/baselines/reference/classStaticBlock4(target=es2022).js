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
var _a;
class C {
    static {
        this.s1;
        C.s1;
        this.s2;
        C.s2;
    }
}
_a = C;
C.s1 = 1;
C.s2 = 2;
C.ss2 = _a.s1;
