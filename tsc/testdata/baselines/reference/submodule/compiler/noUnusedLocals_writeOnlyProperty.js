//// [tests/cases/compiler/noUnusedLocals_writeOnlyProperty.ts] ////

//// [noUnusedLocals_writeOnlyProperty.ts]
class C {
    private x;
    m() {
        this.x = 0;
    }
}


//// [noUnusedLocals_writeOnlyProperty.js]
"use strict";
class C {
    x;
    m() {
        this.x = 0;
    }
}
