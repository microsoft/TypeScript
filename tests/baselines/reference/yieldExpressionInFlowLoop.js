//// [yieldExpressionInFlowLoop.ts]
function* f() {
    let result;
    while (1) {
        result = yield result;
    }
}


//// [yieldExpressionInFlowLoop.js]
function* f() {
    let result;
    while (1) {
        result = yield result;
    }
}
