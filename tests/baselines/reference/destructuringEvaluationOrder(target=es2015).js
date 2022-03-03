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
let trace = [];
let order = (n) => trace.push(n);
// order(0) should evaluate before order(1) because the first element is undefined
let [{ [order(1)]: x } = order(0)] = [];
// order(0) should not evaluate because the first element is defined
let [{ [order(1)]: y } = order(0)] = [{}];
// order(0) should evaluate first (destructuring of object literal {})
// order(1) should evaluate next (initializer because property is undefined)
// order(2) should evaluate last (evaluate object binding pattern from initializer)
let _a = {}, _b = order(0), _c = _a[_b], _d = _c === void 0 ? order(1) : _c, _e = order(2), z = _d[_e], w = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
// https://github.com/microsoft/TypeScript/issues/39181
// b = a must occur *after* 'a' has been assigned
let [_f, _g] = [{ x: 1 }], a = __rest(_f, []), b = _g === void 0 ? a : _g;
