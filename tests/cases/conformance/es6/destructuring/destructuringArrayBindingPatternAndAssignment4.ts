// #35497

// @target: es5
// @downlevelIteration: true
// @lib: es6
// @strict: true

declare const data: number[] | null;
const [value] = data; // Error
