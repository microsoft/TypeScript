//// [emitter.ignoredCatchParameter.esnext.ts]
function fn() {
    try {} catch {}
}


//// [emitter.ignoredCatchParameter.esnext.js]
function fn() {
    try { }
    catch { }
}
