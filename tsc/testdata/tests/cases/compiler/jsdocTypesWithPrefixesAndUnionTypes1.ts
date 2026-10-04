// @checkJs: true
// @declaration: true
// @rootDir: src
// @outDir: dist

// @ts-check

// **Test motivation**
// Previously `?` was a valid "standalone" type that just meant `any`.
// This meant that it was possible to write types like `? | string` which would be equivalent to `any | string`.
// `?` is also allowed as a prefix operator though, so `?number` is equivalent to `number | null`.
//
// In the 7.0 port, `?` ceased to be a valid standalone type,
// but somehow this allowed constructs like `? | string` to be valid,
// which is not what we want. This test is meant to validate how `?` is
// handled when written in different contexts - as a prefix/postfix operator, as a standalone type, and in union types.

// @filename: src/question.js
/** @param {?} x */
export function f0(x) {}

/** @param {?never} x */
export function f1(x) {}

/** @param {never?} x */
export function f2(x) {}

/** @param {? | never} x */
export function f3(x) {}

/** @param {? | string} x */
export function f4(x) {}

/** @param {number | ? | string} x */
export function f5(x) {}

/** @param {number | string | ?} x */
export function f6(x) {}

/** @param {? number | string} x */
export function f7(x) {}

/** @param {number? | string} x */
export function f8(x) {}

/** @param {number | ? string} x */
export function f9(x) {}

/** @param {? { a: number } & { b: number }} x */
export function f10(x) {}

/** @param {{ a: number } & ? { b: number }} x */
export function f11(x) {}

/** @param {? { a: number } & { b: number } | string} x */
export function f12(x) {}

/** @param {{ a: number } & ? { b: number } | string} x */
export function f13(x) {}

/** @param {?readonly number[]} x */
export function f14(x) {}

/** @param {string | ?readonly number[]} x */
export function f15(x) {}

/** @param {?readonly number[] | string} x */
export function f16(x) {}

/** @param {?readonly ?number[] | string} x */
export function f17(x) {}

// @filename: src/exclamation.js
/** @param {!} x */
export function g0(x) {}

/** @param {!never} x */
export function g1(x) {}

/** @param {never!} x */
export function g2(x) {}

/** @param {! | never} x */
export function g3(x) {}

/** @param {! | string} x */
export function g4(x) {}

/** @param {number | ! | string} x */
export function g5(x) {}

/** @param {number | string | !} x */
export function g6(x) {}

/** @param {! number | string} x */
export function g7(x) {}

/** @param {number! | string} x */
export function g8(x) {}

/** @param {number | ! string} x */
export function g9(x) {}

/** @param {! { a: number } & { b: number }} x */
export function g10(x) {}

/** @param {{ a: number } & ! { b: number }} x */
export function g11(x) {}

/** @param {! { a: number } & { b: number } | string} x */
export function g12(x) {}

/** @param {{ a: number } & ! { b: number } | string} x */
export function g13(x) {}

/** @param {!readonly number[]} x */
export function g14(x) {}

/** @param {string | !readonly number[]} x */
export function g15(x) {}

/** @param {!readonly number[] | string} x */
export function g16(x) {}

/** @param {!readonly !number[] | string} x */
export function g17(x) {}