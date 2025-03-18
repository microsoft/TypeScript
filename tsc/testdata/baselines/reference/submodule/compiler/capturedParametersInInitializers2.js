//// [tests/cases/compiler/capturedParametersInInitializers2.ts] ////

//// [capturedParametersInInitializers2.ts]
function foo(
    y = class {
        static c = x;
        get [x]() {return x;}
        constructor() { x; }
        [z]() { return z; }
    },
    x = 1,
    z = 2
) {
    y.c
}
function foo2(y = class {[x] = x}, x = 1) {
}

//// [capturedParametersInInitializers2.js]
function foo(y = class {
    static c = x;
    get [x]() { return x; }
    constructor() { x; }
    [z]() { return z; }
}, x = 1, z = 2) {
    y.c;
}
function foo2(y = class {
    [x] = x;
}, x = 1) {
}
