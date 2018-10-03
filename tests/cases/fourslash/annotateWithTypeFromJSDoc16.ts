/// <reference path='fourslash.ts' />
// @strict: true
/////** @type {function(*, ...number, ...boolean): void} */
////var x = (x, ys, ...zs) => { };

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
`/** @type {function(*, ...number, ...boolean): void} */
var x: (arg0: any, arg1: number[], ...rest: boolean[]) => void = (x, ys, ...zs) => { };`,
});
