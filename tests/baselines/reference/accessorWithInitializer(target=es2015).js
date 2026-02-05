//// [tests/cases/compiler/accessorWithInitializer.ts] ////

//// [accessorWithInitializer.ts]
class C {
    set X(v = 0) { }
    static set X(v2 = 0) { }
}

//// [accessorWithInitializer.js]
"use strict";
class C {
    set X(v = 0) { }
    static set X(v2 = 0) { }
}
