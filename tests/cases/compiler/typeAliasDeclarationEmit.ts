// @target: ES5
// @module: AMD
// @declaration: true

export type callback<T> = () => T;

export type CallbackArray<T extends callback> = () => T;