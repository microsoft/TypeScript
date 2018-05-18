// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: github20832.js

// #20832
/** @typedef {U} T - should be "error, can't find type named 'U' */
/**
 * @template U
 * @param {U} x
 * @return {T}
 */
function f(x) {
    return x;
}

/** @type T - should be fine, since T will be any */
const x = 3;

/**
 * @callback Cb
 * @param {V} firstParam
 */
/**
 * @template V
 * @param {V} vvvvv
 */
function g(vvvvv) {
}

/** @type {Cb} */
const cb = x => {}
