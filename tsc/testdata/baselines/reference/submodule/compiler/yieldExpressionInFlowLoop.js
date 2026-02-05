//// [tests/cases/compiler/yieldExpressionInFlowLoop.ts] ////

//// [yieldExpressionInFlowLoop.ts]
function* f() {
    let result;
    while (1) {
        result = yield result;
    }
}


//// [yieldExpressionInFlowLoop.js]
"use strict";
function* f() {
    let result;
    while (1) {
        result = (yield result);
    }
}
