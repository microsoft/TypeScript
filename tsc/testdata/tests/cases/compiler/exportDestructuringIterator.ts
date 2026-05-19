// @target: esnext
// @module: commonjs
// @strict: true

declare function foo(): any;
export const [A, V] = foo();
export const { x, y } = foo();
export const [a = 1, b = 2] = foo();
export const [c, ...d] = foo();
export const [, e, , f] = foo();
export const [[g, h], { i, j: k }] = foo();
export const { m: [n, o], p: { q } } = foo();
