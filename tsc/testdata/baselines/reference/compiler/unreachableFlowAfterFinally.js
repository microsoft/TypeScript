//// [tests/cases/compiler/unreachableFlowAfterFinally.ts] ////

//// [unreachableFlowAfterFinally.ts]
function f() {
    let x = 100;
    try {
        throw "WAT"
    }
    catch (e) {

    }
    finally {
        return x;
    }
}

//// [unreachableFlowAfterFinally.js]
"use strict";
function f() {
    let x = 100;
    try {
        throw "WAT";
    }
    catch (e) {
    }
    finally {
        return x;
    }
}
