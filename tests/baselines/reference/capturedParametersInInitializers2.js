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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
function foo(y = (_a = class {
        get [x]() { return x; }
        constructor() { x; }
        [z]() { return z; }
    },
    __setFunctionName(_a, "y"),
    _a.c = x,
    _a), x = 1, z = 2) {
    var _a;
    y.c;
}
function foo2(y = (_a = class {
        constructor() {
            this[_b] = x;
        }
    },
    _b = x,
    _a), x = 1) {
    var _b, _a;
}
