//// [tests/cases/compiler/accessorWithLineTerminator.ts] ////

//// [accessorWithLineTerminator.ts]
class C {
    get
    x() { return 1 }

    set
    x(v) {  }
}

//// [accessorWithLineTerminator.js]
"use strict";
class C {
    get x() { return 1; }
    set x(v) { }
}
