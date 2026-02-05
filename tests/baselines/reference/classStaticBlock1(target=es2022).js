//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock1.ts] ////

//// [classStaticBlock1.ts]
const a = 2;

class C {
    static {
        const a = 1;

        a;
    }
}


//// [classStaticBlock1.js]
"use strict";
const a = 2;
class C {
    static {
        const a = 1;
        a;
    }
}
