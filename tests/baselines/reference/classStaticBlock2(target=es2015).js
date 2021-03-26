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
const a = 1;
const b = 2;
class C {
}
_C__ = { value: (() => {
        const a = 11;
        a;
        b;
    })() };
_C__1 = { value: (() => {
        const a = 11;
        a;
        b;
    })() };
