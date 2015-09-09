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
        var _a = a;
        var _b = a;
        var _d = (_c === void 0 ? a : _c).p, _e = _d === void 0 ? a : _d;
        return function (_a, _b, _c) {
            var _a = a;
            var _b = a;
            var _d = (_c === void 0 ? a : _c).p, _e = _d === void 0 ? a : _d;
            return a;
        };
    }
})();
(function () {
    var ns = [];
    for (var _i = 0; _i < ns.length; _i++) {
        var _a = ns[_i];
    }
    for (var _b = 0; _b < ns.length; _b++) {
        var _c = ns[_b];
    }
    for (var _d = 0; _d < ns.length; _d++) {
        var _e = ns[_d];
    }
    for (var _f = 0; _f < ns.length; _f++) {
        var _g = ns[_f];
    }
    for (var _h = 0; _h < ns.length; _h++) {
        var _j = ns[_h];
    }
    for (var _k = 0; _k < ns.length; _k++) {
        var _l = ns[_k];
    }
})();
