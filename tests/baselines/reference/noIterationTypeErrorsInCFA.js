//// [noIterationTypeErrorsInCFA.ts]
interface F {
    d(): void
}
export function doRemove(dds: F | F[]) {
    if (!Array.isArray(dds)) {
        dds = [dds]
    }
    for (let n of dds) {
        n.d()
    }
    return dds
}


//// [noIterationTypeErrorsInCFA.js]
export function doRemove(dds) {
    if (!Array.isArray(dds)) {
        dds = [dds];
    }
    for (let n of dds) {
        n.d();
    }
    return dds;
}
