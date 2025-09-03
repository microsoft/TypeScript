//// [tests/cases/conformance/expressions/typeGuards/typeGuardsInWhileStatement.ts] ////

//// [typeGuardsInWhileStatement.ts]
let cond: boolean;
function a(x: string | number) {
    while (typeof x === "string") {
        x; // string
        x = undefined;
    }
    x; // number
}
function b(x: string | number) {
    while (typeof x === "string") {
        if (cond) continue;
        x; // string
        x = undefined;
    }
    x; // number
}
function c(x: string | number) {
    while (typeof x === "string") {
        if (cond) break;
        x; // string
        x = undefined;
    }
    x; // string | number
}


//// [typeGuardsInWhileStatement.js]
let cond;
function a(x) {
    while (typeof x === "string") {
        x; // string
        x = undefined;
    }
    x; // number
}
function b(x) {
    while (typeof x === "string") {
        if (cond)
            continue;
        x; // string
        x = undefined;
    }
    x; // number
}
function c(x) {
    while (typeof x === "string") {
        if (cond)
            break;
        x; // string
        x = undefined;
    }
    x; // string | number
}
