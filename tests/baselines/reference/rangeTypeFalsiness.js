//// [rangeTypeFalsiness.ts]
function a(arg: (> 0)): true {
    return !!arg;
}

function b(arg: (>= 0)): boolean {
    return !!arg;
}


//// [rangeTypeFalsiness.js]
function a(arg) {
    return !!arg;
}
function b(arg) {
    return !!arg;
}
