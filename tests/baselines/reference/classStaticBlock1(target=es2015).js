//// [classStaticBlock1.ts]
const a = 2;

class C {
    static {
        const a = 1;

        a;
    }
}


//// [classStaticBlock1.js]
var _C__;
const a = 2;
class C {
}
_C__ = { value: (() => {
        const a = 1;
        a;
    })() };
