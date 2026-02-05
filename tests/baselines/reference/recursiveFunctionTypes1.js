//// [tests/cases/compiler/recursiveFunctionTypes1.ts] ////

//// [recursiveFunctionTypes1.ts]
class C {
     static g(t: typeof C.g){ }
}

//// [recursiveFunctionTypes1.js]
"use strict";
class C {
    static g(t) { }
}
