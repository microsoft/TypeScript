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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
function f0() {
    var a = [1, 2, 3];
    var a1 = __spreadArray([], a);
    var a2 = __spreadArray([1], a);
    var a3 = __spreadArray([1, 2], a);
    var a4 = __spreadArray(__spreadArray([], a), [1]);
    var a5 = __spreadArray(__spreadArray([], a), [1, 2]);
    var a6 = __spreadArray(__spreadArray([1, 2], a), [1, 2]);
    var a7 = __spreadArray(__spreadArray(__spreadArray([1], a), [2]), a);
    var a8 = __spreadArray(__spreadArray(__spreadArray([], a), a), a);
}
function f1() {
    var a = [1, 2, 3];
    var b = __spreadArray(__spreadArray(["hello"], a), [true]);
    var b;
}
function f2() {
    var a = [];
    var b = [5];
}
