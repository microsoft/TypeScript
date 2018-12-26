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
function foo(y = (_a = class {
        constructor() { x; }
        get [x]() { return x; }
        [z]() { return z; }
    },
    _a.c = x,
    _a), x = 1, z = 2) {
    var _a;
    y.c;
}
function foo2(y = (_b = class {
        constructor() {
            this[_a] = x;
        }
    },
    _a = x,
    _b), x = 1) {
    var _a, _b;
}
