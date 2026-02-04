//// [tests/cases/compiler/arrayReferenceWithoutTypeArgs.ts] ////

//// [arrayReferenceWithoutTypeArgs.ts]
class X {
    public f(a: Array) { }
}

//// [arrayReferenceWithoutTypeArgs.js]
"use strict";
class X {
    f(a) { }
}
