//// [tests/cases/compiler/unreachableJavascriptChecked.ts] ////

//// [unreachable.js]
function unreachable() {
    return f();
    return 2;
    return 3;
    function f() {}
    return 4;
}


//// [unreachable.js]
"use strict";
function unreachable() {
    return f();
    return 2;
    return 3;
    function f() { }
    return 4;
}
