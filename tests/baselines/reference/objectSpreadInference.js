//// [objectSpreadInference.ts]
interface Result<T,U,V> {
    t: T;
    u: U;
    v: V;
}
declare function infer<T,U,V>(tuv: { ...T, ...U, a: V }): { t: T, u: U, v: V };
declare function infer2<T,U,V>(utv: { ...U, a: V, ...T }): { t: T, u: U, v: V };
function generic<W, X, Y>(w: W, x: X, y: Y) {
    // should infer { t: {}, u: {}, v: {} } because there is no trailing type parameter
    return infer({ ...w, ...x, a: y, b: "different type" });
}
let b: { b: number };
let c: { c: number };
// can only infer { t: {}, u: {}, v: {} }
let i1 = infer({ ...b, ...c, a: 12 });
// can only infer { t: {}, u: {}, v: {} }
let i2 = infer2({ ...b, ...c, a: 12 });
// can only infer { t: {}, u: {}, v: {} }
let i3 = generic(b, c, { a: 12 });


//// [objectSpreadInference.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function generic(w, x, y) {
    // should infer { t: {}, u: {}, v: {} } because there is no trailing type parameter
    return infer(__assign({}, w, x, { a: y, b: "different type" }));
}
var b;
var c;
// can only infer { t: {}, u: {}, v: {} }
var i1 = infer(__assign({}, b, c, { a: 12 }));
// can only infer { t: {}, u: {}, v: {} }
var i2 = infer2(__assign({}, b, c, { a: 12 }));
// can only infer { t: {}, u: {}, v: {} }
var i3 = generic(b, c, { a: 12 });
