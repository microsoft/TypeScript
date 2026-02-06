//// [tests/cases/compiler/typeParameterAsElementType.ts] ////

//// [typeParameterAsElementType.ts]
function fee<T>() {
    var t: T;
    var arr = [t, ""];
}

//// [typeParameterAsElementType.js]
"use strict";
function fee() {
    var t;
    var arr = [t, ""];
}
