// @target: ES5
// @module: AMD
// @declaration: true
// @allowSyntheticDefaultImports: true

export type callback<T> = () => T;

export type CallbackArray<T extends callback> = () => T;