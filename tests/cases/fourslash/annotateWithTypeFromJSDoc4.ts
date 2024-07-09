/// <reference path='fourslash.ts' />
// @strict: true
/////**
//// * @param {*} x
//// * @param {?} y
//// * @param {number=} z
//// * @param {...number} alpha
//// * @param {function(this:{ a: string}, string, number): boolean} beta
//// * @param {number?} gamma
//// * @param {number!} delta
//// */
////function [|f|](x, y, z, alpha, beta, gamma, delta) {
////    x; y; z; alpha; beta; gamma; delta;
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    index: 7,
    newFileContent:
`/**
 * @param {*} x
 * @param {?} y
 * @param {number=} z
 * @param {...number} alpha
 * @param {function(this:{ a: string}, string, number): boolean} beta
 * @param {number?} gamma
 * @param {number!} delta
 */
function f(x: any, y: any, z: number | undefined, alpha: number[], beta: (this: { a: string; }, arg1: string, arg2: number) => boolean, gamma: number | null, delta: number) {
    x; y; z; alpha; beta; gamma; delta;
}`,
});
