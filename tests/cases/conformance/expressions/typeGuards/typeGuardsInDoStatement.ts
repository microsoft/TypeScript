let cond: boolean;
function a(x: string | number | boolean) {
    x = true;
    do {
        x; // boolean | string
        x = undefined;
    } while (typeof x === "string")
    x; // number | boolean
}
function b(x: string | number | boolean) {
    x = true;
    do {
        x; // boolean | string
        if (cond) continue;
        x = undefined;
    } while (typeof x === "string")
    x; // number | boolean
}
function c(x: string | number) {
    x = "";
    do {
        x; // string
        if (cond) break;
        x = undefined;
    } while (typeof x === "string")
    x; // string | number
}
