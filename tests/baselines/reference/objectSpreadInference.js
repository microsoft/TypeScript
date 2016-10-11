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
// should infer { t: {}, u: { b: number, c: number }, v: number }
let i1 = infer({ ...b, ...c, a: 12 });
// should infer { t: { a: number, b: number, c: number }, u: {}, v: {} }
let i2 = infer2({ ...b, ...c, a: 12 });
// should infer { t: {}, u: {}, v: {} }
let i3 = generic(b, c, { a: 12 });

interface Preserved {
    kind: 0 | 1 | 2 | 3;
}
class C implements Preserved {
    kind: 0 = 0;
    a = 1;
    method() { return "C"; }
}
declare function revive<T extends Preserved>(t: { ...T }): T;
function genericRevive<U extends Preserved>(u: U) {
    let us: { ...U };
    return revive(us);
}
// result should not have `method`
let result = revive({ a: 12, kind: 0 });
// result2 should be of type C and have `method`
let result2 = revive<C>({ a: 12, kind: 0 });

declare function destructureRevive<T extends Preserved>(t: { ...T, a: number }): T;
function genericDestructureRevive<U extends Preserved & { a: number }>(u: U) {
    let us: { ...U };
    return destructureRevive(us);
}
// result3 is just `Preserved` because `a` and `method` both get removed
let result3 = destructureRevive({ a: 12, kind: 0 });
// result4 is still C -- a is not removed -- because we specified the argument explicitly
let result4 = destructureRevive<C>({ a: 12, kind: 0 });
result4.method();
result4.a;

declare function removeIndexSignature<T>(t: { ...T, a: number, [s: string]: number, [n: number]: number }): T;
interface I {
    a: number;
    b: number;
    [s: string]: number;
    [n: number]: number;
}
let i: I;
let result5 = removeIndexSignature(i);


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
// should infer { t: {}, u: { b: number, c: number }, v: number }
var i1 = infer(__assign({}, b, c, { a: 12 }));
// should infer { t: { a: number, b: number, c: number }, u: {}, v: {} }
var i2 = infer2(__assign({}, b, c, { a: 12 }));
// should infer { t: {}, u: {}, v: {} }
var i3 = generic(b, c, { a: 12 });
var C = (function () {
    function C() {
        this.kind = 0;
        this.a = 1;
    }
    C.prototype.method = function () { return "C"; };
    return C;
}());
function genericRevive(u) {
    var us;
    return revive(us);
}
// result should not have `method`
var result = revive({ a: 12, kind: 0 });
// result2 should be of type C and have `method`
var result2 = revive({ a: 12, kind: 0 });
function genericDestructureRevive(u) {
    var us;
    return destructureRevive(us);
}
// result3 is just `Preserved` because `a` and `method` both get removed
var result3 = destructureRevive({ a: 12, kind: 0 });
// result4 is still C -- a is not removed -- because we specified the argument explicitly
var result4 = destructureRevive({ a: 12, kind: 0 });
result4.method();
result4.a;
var i;
var result5 = removeIndexSignature(i);
