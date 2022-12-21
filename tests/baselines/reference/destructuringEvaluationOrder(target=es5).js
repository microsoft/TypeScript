//// [destructuringEvaluationOrder.ts]
// https://github.com/microsoft/TypeScript/issues/39205
let trace: any[] = [];
let order = (n: any): any => trace.push(n);

// order(0) should evaluate before order(1) because the first element is undefined
let [{ [order(1)]: x } = order(0)] = [];

// order(0) should not evaluate because the first element is defined
let [{ [order(1)]: y } = order(0)] = [{}];

// order(0) should evaluate first (destructuring of object literal {})
// order(1) should evaluate next (initializer because property is undefined)
// order(2) should evaluate last (evaluate object binding pattern from initializer)
let { [order(0)]: { [order(2)]: z } = order(1), ...w } = {} as any;


// https://github.com/microsoft/TypeScript/issues/39181

// b = a must occur *after* 'a' has been assigned
let [{ ...a }, b = a]: any[] = [{ x: 1 }]


//// [destructuringEvaluationOrder.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// https://github.com/microsoft/TypeScript/issues/39205
var trace = [];
var order = function (n) { return trace.push(n); };
// order(0) should evaluate before order(1) because the first element is undefined
var _a = [], _b = _a[0], _c = _b === void 0 ? order(0) : _b, _d = order(1), x = _c[_d];
// order(0) should not evaluate because the first element is defined
var _e = [{}], _f = _e[0], _g = _f === void 0 ? order(0) : _f, _h = order(1), y = _g[_h];
// order(0) should evaluate first (destructuring of object literal {})
// order(1) should evaluate next (initializer because property is undefined)
// order(2) should evaluate last (evaluate object binding pattern from initializer)
var _j = {}, _k = order(0), _l = _j[_k], _m = _l === void 0 ? order(1) : _l, _o = order(2), z = _m[_o], w = __rest(_j, [typeof _k === "symbol" ? _k : _k + ""]);
// https://github.com/microsoft/TypeScript/issues/39181
// b = a must occur *after* 'a' has been assigned
var _p = [{ x: 1 }], _q = _p[0], _r = _p[1], a = __rest(_q, []), b = _r === void 0 ? a : _r;
