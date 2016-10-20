//// [capturedParametersInInitializers2.ts]
function foo(y = class {static c = x}, x = 1) {
    y.c
}
function foo2(y = class {[x] = x}, x = 1) {
}

//// [capturedParametersInInitializers2.js]
function foo(y, x) {
    if (y === void 0) { y = (_a = (function () {
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
    if (y === void 0) { y = (function () {
        function class_2() {
            this[x] = x;
        }
        return class_2;
    }()); }
    if (x === void 0) { x = 1; }
}
