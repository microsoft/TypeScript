//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlockUseBeforeDef5.ts] ////

//// [classStaticBlockUseBeforeDef5.ts]
class C {
    static {
        this.x = 1;
    }
    static accessor x;
}


//// [classStaticBlockUseBeforeDef5.js]
"use strict";
class C {
    static {
        this.x = 1;
    }
    static accessor x;
}


//// [classStaticBlockUseBeforeDef5.d.ts]
declare class C {
    static accessor x: number;
}
