// @target: ES5
// @module: commonjs
// @declaration: true

export type callback<T> = () => T;

export type CallbackArray<T extends callback> = () => T;