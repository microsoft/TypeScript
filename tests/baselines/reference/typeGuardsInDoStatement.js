//// [tests/cases/conformance/expressions/typeGuards/typeGuardsInDoStatement.ts] ////

//// [typeGuardsInDoStatement.ts]
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


//// [typeGuardsInDoStatement.js]
var cond;
function a(x) {
    x = true;
    do {
        x; // boolean | string
        x = undefined;
    } while (typeof x === "string");
    x; // number | boolean
}
function b(x) {
    x = true;
    do {
        x; // boolean | string
        if (cond)
            continue;
        x = undefined;
    } while (typeof x === "string");
    x; // number | boolean
}
function c(x) {
    x = "";
    do {
        x; // string
        if (cond)
            break;
        x = undefined;
    } while (typeof x === "string");
    x; // string | number
}
