let cond: boolean;
function a(x: string | number) {
    for (x = undefined; typeof x !== "number"; x = undefined) {
        x; // string
    }
    x; // number
}
function b(x: string | number) {
    for (x = undefined; typeof x !== "number"; x = undefined) {
        x; // string
        if (cond) continue;
    }
    x; // number
}
function c(x: string | number) {
    for (x = undefined; typeof x !== "number"; x = undefined) {
        x; // string
        if (cond) break;
    }
    x; // string | number
}
