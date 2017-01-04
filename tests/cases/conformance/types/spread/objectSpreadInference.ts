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
