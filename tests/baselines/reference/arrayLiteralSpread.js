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
function f0() {
    var a = [1, 2, 3];
    var a1 = a.slice();
    var a2 = [1].concat(a);
    var a3 = [1, 2].concat(a);
    var a4 = a.concat([1]);
    var a5 = a.concat([1, 2]);
    var a6 = [1, 2].concat(a, [1, 2]);
    var a7 = [1].concat(a, [2], a);
    var a8 = a.concat(a, a);
}
function f1() {
    var a = [1, 2, 3];
    var b = ["hello"].concat(a, [true]);
    var b;
}
function f2() {
    var a = [];
    var b = [5];
}
