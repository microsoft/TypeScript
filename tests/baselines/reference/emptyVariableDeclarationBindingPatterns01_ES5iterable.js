//// [emptyVariableDeclarationBindingPatterns01_ES5iterable.ts]

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

//// [emptyVariableDeclarationBindingPatterns01_ES5iterable.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var __values = (this && this.__values) || function (o) { return (i = typeof Symbol === "function" && o[Symbol.iterator] || 0) ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } }; var i, d; };
var __step = (this && this.__step) || function (r) { return !(r.done || (r.done = (r.result = r.iterator.next()).done)); };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
(function () {
    var a;
    var _a = a;
    var _b = a;
    var _c = a;
    var _d = __read(a, 0);
    var _e = __read(a, 0);
    var _f = __read(a, 0);
    var _g = a, _h = __read(a, 0);
    var _j = a, _k = __read(a, 0);
    var _l = a, _m = __read(a, 0);
    var _o = a.p1, _p = __read(a.p2, 0);
    var _q = a.p1, _r = __read(a.p2, 0);
    var _s = a.p1, _t = __read(a.p2, 0);
    for (var _u = {}, _v = {}; false; void 0) {
    }
    function f(_a, _b, _c) {
        _a = a;
        _b = a;
        var _d = (_c === void 0 ? a : _c).p, _e = _d === void 0 ? a : _d;
        return function (_a, _b, _c) {
            _a = a;
            _b = a;
            var _d = (_c === void 0 ? a : _c).p, _e = _d === void 0 ? a : _d;
            return a;
        };
    }
})();
(function () {
    var ns = [];
    try {
        for (var ns_1 = { iterator: __values(ns) }; __step(ns_1);) {
            var _a = ns_1.result.value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try { __close(ns_1); } finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var ns_2 = { iterator: __values(ns) }; __step(ns_2);) {
            var _b = ns_2.result.value;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try { __close(ns_2); } finally { if (e_2) throw e_2.error; }
    }
    try {
        for (var ns_3 = { iterator: __values(ns) }; __step(ns_3);) {
            var _c = ns_3.result.value;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try { __close(ns_3); } finally { if (e_3) throw e_3.error; }
    }
    try {
        for (var ns_4 = { iterator: __values(ns) }; __step(ns_4);) {
            var _d = __read(ns_4.result.value, 0);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try { __close(ns_4); } finally { if (e_4) throw e_4.error; }
    }
    try {
        for (var ns_5 = { iterator: __values(ns) }; __step(ns_5);) {
            var _e = __read(ns_5.result.value, 0);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try { __close(ns_5); } finally { if (e_5) throw e_5.error; }
    }
    try {
        for (var ns_6 = { iterator: __values(ns) }; __step(ns_6);) {
            var _f = __read(ns_6.result.value, 0);
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try { __close(ns_6); } finally { if (e_6) throw e_6.error; }
    }
    var e_1, e_2, e_3, e_4, e_5, e_6;
})();
