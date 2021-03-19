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
var _C__, _C__1;
const a = 1;
class C {
}
C.f1 = 1;
_C__ = { value: (() => {
        console.log(C.f1, C.f2, C.f3);
    })() };
C.f2 = 2;
_C__1 = { value: (() => {
        console.log(C.f1, C.f2, C.f3);
    })() };
C.f3 = 3;
