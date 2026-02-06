//// [tests/cases/compiler/recursiveGenericSignatureInstantiation.ts] ////

//// [recursiveGenericSignatureInstantiation.ts]
function f6<T>(x: T) {
    return f6(x);
}


//// [recursiveGenericSignatureInstantiation.js]
"use strict";
function f6(x) {
    return f6(x);
}
