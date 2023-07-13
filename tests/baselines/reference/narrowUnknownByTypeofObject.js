//// [tests/cases/compiler/narrowUnknownByTypeofObject.ts] ////

//// [narrowUnknownByTypeofObject.ts]
function foo(x: unknown) {
    if (typeof x === "object") {
        x
    }
}


//// [narrowUnknownByTypeofObject.js]
function foo(x) {
    if (typeof x === "object") {
        x;
    }
}
