//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock3.ts] ////

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
const a = 1;
class C {
    static f1 = 1;
    static {
        console.log(C.f1, C.f2, C.f3);
    }
    static f2 = 2;
    static {
        console.log(C.f1, C.f2, C.f3);
    }
    static f3 = 3;
}
