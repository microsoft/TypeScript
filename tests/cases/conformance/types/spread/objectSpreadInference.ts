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
