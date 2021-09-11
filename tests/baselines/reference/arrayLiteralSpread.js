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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function f0() {
    var a = [1, 2, 3];
    var a1 = __spreadArray([], a, true);
    var a2 = __spreadArray([1], a, true);
    var a3 = __spreadArray([1, 2], a, true);
    var a4 = __spreadArray(__spreadArray([], a, true), [1], false);
    var a5 = __spreadArray(__spreadArray([], a, true), [1, 2], false);
    var a6 = __spreadArray(__spreadArray([1, 2], a, true), [1, 2], false);
    var a7 = __spreadArray(__spreadArray(__spreadArray([1], a, true), [2], false), a, true);
    var a8 = __spreadArray(__spreadArray(__spreadArray([], a, true), a, true), a, true);
}
function f1() {
    var a = [1, 2, 3];
    var b = __spreadArray(__spreadArray(["hello"], a, true), [true], false);
    var b;
}
function f2() {
    var a = [];
    var b = [5];
}
