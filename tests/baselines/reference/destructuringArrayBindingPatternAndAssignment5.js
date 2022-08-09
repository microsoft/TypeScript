//// [destructuringArrayBindingPatternAndAssignment5.ts]
// To be inferred as `number`
function f1() {
    const [a1, b1 = a1] = [1];
    const [a2, b2 = 1 + a2] = [1];
    const [a3, b3 = (() => 1 + a3)()] = [1];
    const [a4, b4 = (() => (() => 1 + a4)() + 1)()] = [1];

    function fn1([a1, b1 = a1] = [1]) { };
    function fn2([a2, b2 = 1 + a2] = [1]) { };
    function fn3([a3, b3 = (() => 1 + a3)()] = [1]) { };
    function fn4([a4, b4 = (() => (() => 1 + a4)() + 1)()] = [1]) { };
}

// To be inferred as `string`
function f2() {
    const [a1, b1 = a1] = ['hi'];
    const [a2, b2 = [a2, '!'].join()] = ['hi'];
    const [a3, b3 = (() => [a3, '!'].join())()] = ['hi'];
    const [a4, b4 = (() => (() => [a4, '!'].join())() + '!')()] = ['hi'];
}

// To be inferred as `string | number`
function f3() {
    const [a1, b1 = a1] = ['hi', 1];
    const [a2, b2 = [a2, '!'].join()] = ['hi', 1];
    const [a3, b3 = (() => [a3, '!'].join())()] = ['hi', 1];
    const [a4, b4 = (() => (() => [a4, '!'].join())() + '!')()] = ['hi', 1];
}


//// [destructuringArrayBindingPatternAndAssignment5.js]
// To be inferred as `number`
function f1() {
    var _a = [1], a1 = _a[0], _b = _a[1], b1 = _b === void 0 ? a1 : _b;
    var _c = [1], a2 = _c[0], _d = _c[1], b2 = _d === void 0 ? 1 + a2 : _d;
    var _e = [1], a3 = _e[0], _f = _e[1], b3 = _f === void 0 ? (function () { return 1 + a3; })() : _f;
    var _g = [1], a4 = _g[0], _h = _g[1], b4 = _h === void 0 ? (function () { return (function () { return 1 + a4; })() + 1; })() : _h;
    function fn1(_a) {
        var _b = _a === void 0 ? [1] : _a, a1 = _b[0], _c = _b[1], b1 = _c === void 0 ? a1 : _c;
    }
    ;
    function fn2(_a) {
        var _b = _a === void 0 ? [1] : _a, a2 = _b[0], _c = _b[1], b2 = _c === void 0 ? 1 + a2 : _c;
    }
    ;
    function fn3(_a) {
        var _b = _a === void 0 ? [1] : _a, a3 = _b[0], _c = _b[1], b3 = _c === void 0 ? (function () { return 1 + a3; })() : _c;
    }
    ;
    function fn4(_a) {
        var _b = _a === void 0 ? [1] : _a, a4 = _b[0], _c = _b[1], b4 = _c === void 0 ? (function () { return (function () { return 1 + a4; })() + 1; })() : _c;
    }
    ;
}
// To be inferred as `string`
function f2() {
    var _a = ['hi'], a1 = _a[0], _b = _a[1], b1 = _b === void 0 ? a1 : _b;
    var _c = ['hi'], a2 = _c[0], _d = _c[1], b2 = _d === void 0 ? [a2, '!'].join() : _d;
    var _e = ['hi'], a3 = _e[0], _f = _e[1], b3 = _f === void 0 ? (function () { return [a3, '!'].join(); })() : _f;
    var _g = ['hi'], a4 = _g[0], _h = _g[1], b4 = _h === void 0 ? (function () { return (function () { return [a4, '!'].join(); })() + '!'; })() : _h;
}
// To be inferred as `string | number`
function f3() {
    var _a = ['hi', 1], a1 = _a[0], _b = _a[1], b1 = _b === void 0 ? a1 : _b;
    var _c = ['hi', 1], a2 = _c[0], _d = _c[1], b2 = _d === void 0 ? [a2, '!'].join() : _d;
    var _e = ['hi', 1], a3 = _e[0], _f = _e[1], b3 = _f === void 0 ? (function () { return [a3, '!'].join(); })() : _f;
    var _g = ['hi', 1], a4 = _g[0], _h = _g[1], b4 = _h === void 0 ? (function () { return (function () { return [a4, '!'].join(); })() + '!'; })() : _h;
}
