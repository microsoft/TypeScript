// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: a.js
/**
 * @template {{ a: number, b: string }} T,U A Comment
 * @template {{ c: boolean }} V uh ... are comments even supported??
 * @template W
 * @template X That last one had no comment
 * @param {T} t
 * @param {U} u
 * @param {V} v
 * @param {W} w
 * @param {X} x
 * @return {W | X}
 */
function f(t, u, v, w, x) {
    if(t.a + t.b.length > u.a - u.b.length && v.c) {
        return w;
    }
    return x;
}

f({ a: 12, b: 'hi', c: null }, undefined, { c: false, d: 12, b: undefined }, 101, 'nope');
f({ a: 12  }, undefined, undefined, 101, 'nope');

/**
 * @template {NoLongerAllowed}
 * @template T preceding line's syntax is no longer allowed
 * @param {T} x
 */
function g(x) { }

