//// [tests/cases/compiler/unusedVariablesinForLoop.ts] ////

//// [unusedVariablesinForLoop.ts]
function f1 () {
    for(var i = 0; ;) {

    }
}

//// [unusedVariablesinForLoop.js]
"use strict";
function f1() {
    for (var i = 0;;) {
    }
}
