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
////function f(/*1*/x, /*2*/y, /*3*/z, /*4*/alpha, /*5*/beta, /*6*/gamma, /*7*/delta) {
////}

verify.applicableRefactorAvailableAtMarker('5');
verify.fileAfterApplyingRefactorAtMarker('5',
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
}`, 'Annotate with type from JSDoc', 'annotate');
