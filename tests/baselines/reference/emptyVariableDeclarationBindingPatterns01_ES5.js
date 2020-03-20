//// [emptyVariableDeclarationBindingPatterns01_ES5.ts]
(function () {
    var a: any;

    var {} = a;
    let {} = a;
    const {} = a;

    var [] = a;
    let [] = a;
    const [] = a;

    var {} = a, [] = a;
    let {} = a, [] = a;
    const {} = a, [] = a;

    var { p1: {}, p2: [] } = a;
    let { p1: {}, p2: [] } = a;
    const { p1: {}, p2: [] } = a;

    for (var {} = {}, {} = {}; false; void 0) {
    }

    function f({} = a, [] = a, { p: {} = a} = a) {
        return ({} = a, [] = a, { p: {} = a } = a) => a;
    }
})();

(function () {
    const ns: number[][] = [];

    for (var {} of ns) {
    }

    for (let {} of ns) {
    }

    for (const {} of ns) {
    }

    for (var [] of ns) {
    }

    for (let [] of ns) {
    }

    for (const [] of ns) {
    }
})();

//// [emptyVariableDeclarationBindingPatterns01_ES5.js]
(function () {
    var a;
    var _a = a;
    var _b = a;
    var _c = a;
    var _d = a;
    var _e = a;
    var _f = a;
    var _g = a, _h = a;
    var _j = a, _k = a;
    var _l = a, _m = a;
    var _o = a.p1, _p = a.p2;
    var _q = a.p1, _r = a.p2;
    var _s = a.p1, _t = a.p2;
    for (var _u = {}, _v = {}; false; void 0) {
    }
    function f(_w, _x, _y) {
        _w = a;
        _x = a;
        var _z = (_y === void 0 ? a : _y).p, _0 = _z === void 0 ? a : _z;
        return function (_1, _2, _3) {
            _1 = a;
            _2 = a;
            var _4 = (_3 === void 0 ? a : _3).p, _5 = _4 === void 0 ? a : _4;
            return a;
        };
    }
})();
(function () {
    var ns = [];
    for (var _i = 0, ns_1 = ns; _i < ns_1.length; _i++) {
        var _6 = ns_1[_i];
    }
    for (var _7 = 0, ns_2 = ns; _7 < ns_2.length; _7++) {
        var _8 = ns_2[_7];
    }
    for (var _9 = 0, ns_3 = ns; _9 < ns_3.length; _9++) {
        var _10 = ns_3[_9];
    }
    for (var _11 = 0, ns_4 = ns; _11 < ns_4.length; _11++) {
        var _12 = ns_4[_11];
    }
    for (var _13 = 0, ns_5 = ns; _13 < ns_5.length; _13++) {
        var _14 = ns_5[_13];
    }
    for (var _15 = 0, ns_6 = ns; _15 < ns_6.length; _15++) {
        var _16 = ns_6[_15];
    }
})();
