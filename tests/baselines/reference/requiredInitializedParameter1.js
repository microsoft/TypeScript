//// [tests/cases/compiler/requiredInitializedParameter1.ts] ////

//// [requiredInitializedParameter1.ts]
function f1(a, b = 0, c) { }
function f2(a, b = 0, c = 0) { }
function f3(a, b = 0, c?) { }
function f4(a, b = 0, ...c) { }

f1(0, 1, 2);
f2(0, 1, 2);
f3(0, 1, 2);
f4(0, 1, 2);

f1(0, 1);
f2(0, 1);
f3(0, 1);
f4(0, 1);

f1(0);
f2(0);
f3(0);
f4(0);

//// [requiredInitializedParameter1.js]
function f1(a, b, c) {
    if (b === void 0) { b = 0; }
}
function f2(a, b, c) {
    if (b === void 0) { b = 0; }
    if (c === void 0) { c = 0; }
}
function f3(a, b, c) {
    if (b === void 0) { b = 0; }
}
function f4(a, b) {
    if (b === void 0) { b = 0; }
    var c = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        c[_i - 2] = arguments[_i];
    }
}
f1(0, 1, 2);
f2(0, 1, 2);
f3(0, 1, 2);
f4(0, 1, 2);
f1(0, 1);
f2(0, 1);
f3(0, 1);
f4(0, 1);
f1(0);
f2(0);
f3(0);
f4(0);
