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
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
    var e_1, _6, e_2, _7, e_3, _8, e_4, _9, e_5, _10, e_6, _11;
    var ns = [];
    try {
        for (var ns_1 = __values(ns), ns_1_1 = ns_1.next(); !ns_1_1.done; ns_1_1 = ns_1.next()) {
            var _12 = ns_1_1.value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (ns_1_1 && !ns_1_1.done && (_6 = ns_1.return)) _6.call(ns_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var ns_2 = __values(ns), ns_2_1 = ns_2.next(); !ns_2_1.done; ns_2_1 = ns_2.next()) {
            var _13 = ns_2_1.value;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (ns_2_1 && !ns_2_1.done && (_7 = ns_2.return)) _7.call(ns_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    try {
        for (var ns_3 = __values(ns), ns_3_1 = ns_3.next(); !ns_3_1.done; ns_3_1 = ns_3.next()) {
            var _14 = ns_3_1.value;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (ns_3_1 && !ns_3_1.done && (_8 = ns_3.return)) _8.call(ns_3);
        }
        finally { if (e_3) throw e_3.error; }
    }
    try {
        for (var ns_4 = __values(ns), ns_4_1 = ns_4.next(); !ns_4_1.done; ns_4_1 = ns_4.next()) {
            var _15 = __read(ns_4_1.value, 0);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (ns_4_1 && !ns_4_1.done && (_9 = ns_4.return)) _9.call(ns_4);
        }
        finally { if (e_4) throw e_4.error; }
    }
    try {
        for (var ns_5 = __values(ns), ns_5_1 = ns_5.next(); !ns_5_1.done; ns_5_1 = ns_5.next()) {
            var _16 = __read(ns_5_1.value, 0);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (ns_5_1 && !ns_5_1.done && (_10 = ns_5.return)) _10.call(ns_5);
        }
        finally { if (e_5) throw e_5.error; }
    }
    try {
        for (var ns_6 = __values(ns), ns_6_1 = ns_6.next(); !ns_6_1.done; ns_6_1 = ns_6.next()) {
            var _17 = __read(ns_6_1.value, 0);
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (ns_6_1 && !ns_6_1.done && (_11 = ns_6.return)) _11.call(ns_6);
        }
        finally { if (e_6) throw e_6.error; }
    }
})();
