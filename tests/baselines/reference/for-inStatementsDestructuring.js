//// [for-inStatementsDestructuring.ts]
for (var [a, b] in []) {}
for (var { a, b } in []) {}

for (let [a, b] in []) {
    (() => a + b);
}

for (let { a, b } in []) {
    (() => a + b);
}


//// [for-inStatementsDestructuring.js]
for (var _a in []) {
    var a = _a[0], b = _a[1];
}
for (var _b in []) {
    var a = _b.a, b = _b.b;
}
var _loop_1 = function (a_1, b_1) {
    (function () { return a_1 + b_1; });
};
for (var _c in []) {
    var a_1 = _c[0], b_1 = _c[1];
    _loop_1(a_1, b_1);
}
var _loop_2 = function (a_2, b_2) {
    (function () { return a_2 + b_2; });
};
for (var _d in []) {
    var a_2 = _d.a, b_2 = _d.b;
    _loop_2(a_2, b_2);
}
