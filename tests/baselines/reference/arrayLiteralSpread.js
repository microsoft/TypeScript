//// [arrayLiteralSpread.ts]
function f0() {
    var a = [1, 2, 3];
    var a1 = [...a];
    var a2 = [1, ...a];
    var a3 = [1, 2, ...a];
    var a4 = [...a, 1];
    var a5 = [...a, 1, 2];
    var a6 = [1, 2, ...a, 1, 2];
    var a7 = [1, ...a, 2, ...a];
    var a8 = [...a, ...a, ...a];
}

function f1() {
    var a = [1, 2, 3];
    var b = ["hello", ...a, true];
    var b: (string | number | boolean)[];
}

function f2() {
    var a = [...[...[...[...[...[]]]]]];
    var b = [...[...[...[...[...[5]]]]]];
}


//// [arrayLiteralSpread.js]
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function f0() {
    var a = [1, 2, 3];
    var a1 = __spreadArrays(a);
    var a2 = __spreadArrays([1], a);
    var a3 = __spreadArrays([1, 2], a);
    var a4 = __spreadArrays(a, [1]);
    var a5 = __spreadArrays(a, [1, 2]);
    var a6 = __spreadArrays([1, 2], a, [1, 2]);
    var a7 = __spreadArrays([1], a, [2], a);
    var a8 = __spreadArrays(a, a, a);
}
function f1() {
    var a = [1, 2, 3];
    var b = __spreadArrays(["hello"], a, [true]);
    var b;
}
function f2() {
    var a = [];
    var b = [5];
}
