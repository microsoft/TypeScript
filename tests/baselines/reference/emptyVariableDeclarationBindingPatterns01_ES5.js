//// [tests/cases/conformance/es6/destructuring/emptyVariableDeclarationBindingPatterns01_ES5.ts] ////

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
    function f(_a, _b, _c) {
        _a = a;
        _b = a;
        var _d = _c === void 0 ? a : _c, _e = _d.p, _f = _e === void 0 ? a : _e, _g = _f;
        return function (_a, _b, _c) {
            _a = a;
            _b = a;
            var _d = _c === void 0 ? a : _c, _e = _d.p, _f = _e === void 0 ? a : _e, _g = _f;
            return a;
        };
    }
})();
(function () {
    var ns = [];
    for (var _i = 0, ns_1 = ns; _i < ns_1.length; _i++) {
        var _a = ns_1[_i];
    }
    for (var _b = 0, ns_2 = ns; _b < ns_2.length; _b++) {
        var _c = ns_2[_b];
    }
    for (var _d = 0, ns_3 = ns; _d < ns_3.length; _d++) {
        var _e = ns_3[_d];
    }
    for (var _f = 0, ns_4 = ns; _f < ns_4.length; _f++) {
        var _g = ns_4[_f];
    }
    for (var _h = 0, ns_5 = ns; _h < ns_5.length; _h++) {
        var _j = ns_5[_h];
    }
    for (var _k = 0, ns_6 = ns; _k < ns_6.length; _k++) {
        var _l = ns_6[_k];
    }
})();
