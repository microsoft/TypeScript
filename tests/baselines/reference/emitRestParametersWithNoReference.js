//// [emitRestParametersWithNoReference.ts]
function foo (b: boolean, ...rest: any[]) {
    if (!b) return
    return;
}


//// [emitRestParametersWithNoReference.js]
function foo(b) {
    if (!b)
        return;
    return;
}
