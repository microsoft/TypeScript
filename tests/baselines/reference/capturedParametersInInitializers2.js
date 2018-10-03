//// [capturedParametersInInitializers2.ts]
function foo(y = class {static c = x}, x = 1) {
    y.c
}
function foo2(y = class {[x] = x}, x = 1) {
}

//// [capturedParametersInInitializers2.js]
function foo(y, x) {
    if (y === void 0) { y = (_a = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        _a.c = x,
        _a); }
    if (x === void 0) { x = 1; }
    y.c;
    var _a;
}
function foo2(y, x) {
    if (y === void 0) { y = (_a = /** @class */ (function () {
            function class_2() {
                this[_b] = x;
            }
            return class_2;
        }()),
        _b = x,
        _a); }
    if (x === void 0) { x = 1; }
    var _b, _a;
}
