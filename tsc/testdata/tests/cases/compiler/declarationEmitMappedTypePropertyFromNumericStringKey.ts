// @module: commonjs
// @target: es2015
// @declaration: true
export const f = (<T>(arg: {[K in keyof T]: T[K] | string}) => arg)({'0': 0}); // Original prop uses string syntax