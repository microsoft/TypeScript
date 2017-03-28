// @target: ES5
// @module: AMD
// @declaration: true
// @noImplicitAny: true

export type callback<T> = () => T;

export type CallbackArray<T extends callback> = () => T;