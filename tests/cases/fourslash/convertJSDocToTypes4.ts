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

verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`/**
 * @param {*} x
 * @param {?} y
 * @param {number=} z
 * @param {...number} alpha
 * @param {function(this:{ a: string}, string, number): boolean} beta
 * @param {number?} gamma
 * @param {number!} delta
 */
function f(x: any, y, z, alpha, beta, gamma, delta) {
}`, 'Annotate with type from JSDoc', 'annotate');

verify.applicableRefactorAvailableAtMarker('2');
verify.fileAfterApplyingRefactorAtMarker('2',
`/**
 * @param {*} x
 * @param {?} y
 * @param {number=} z
 * @param {...number} alpha
 * @param {function(this:{ a: string}, string, number): boolean} beta
 * @param {number?} gamma
 * @param {number!} delta
 */
function f(x: any, y: any, z, alpha, beta, gamma, delta) {
}`, 'Annotate with type from JSDoc', 'annotate');

verify.applicableRefactorAvailableAtMarker('3');
verify.fileAfterApplyingRefactorAtMarker('3',
`/**
 * @param {*} x
 * @param {?} y
 * @param {number=} z
 * @param {...number} alpha
 * @param {function(this:{ a: string}, string, number): boolean} beta
 * @param {number?} gamma
 * @param {number!} delta
 */
function f(x: any, y: any, z: number | undefined, alpha, beta, gamma, delta) {
}`, 'Annotate with type from JSDoc', 'annotate');
verify.applicableRefactorAvailableAtMarker('4');
verify.fileAfterApplyingRefactorAtMarker('4',
`/**
 * @param {*} x
 * @param {?} y
 * @param {number=} z
 * @param {...number} alpha
 * @param {function(this:{ a: string}, string, number): boolean} beta
 * @param {number?} gamma
 * @param {number!} delta
 */
function f(x: any, y: any, z: number | undefined, alpha: number[], beta, gamma, delta) {
}`, 'Annotate with type from JSDoc', 'annotate');

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
function f(x: any, y: any, z: number | undefined, alpha: number[], beta: (this: {
    a: string;
}, arg1: string, arg2: number) => boolean, gamma, delta) {
}`, 'Annotate with type from JSDoc', 'annotate');
verify.applicableRefactorAvailableAtMarker('6');
verify.fileAfterApplyingRefactorAtMarker('6',
`/**
 * @param {*} x
 * @param {?} y
 * @param {number=} z
 * @param {...number} alpha
 * @param {function(this:{ a: string}, string, number): boolean} beta
 * @param {number?} gamma
 * @param {number!} delta
 */
function f(x: any, y: any, z: number | undefined, alpha: number[], beta: (this: {
    a: string;
}, arg1: string, arg2: number) => boolean, gamma: number | null, delta) {
}`, 'Annotate with type from JSDoc', 'annotate');

verify.applicableRefactorAvailableAtMarker('7');
verify.fileAfterApplyingRefactorAtMarker('7',
`/**
 * @param {*} x
 * @param {?} y
 * @param {number=} z
 * @param {...number} alpha
 * @param {function(this:{ a: string}, string, number): boolean} beta
 * @param {number?} gamma
 * @param {number!} delta
 */
function f(x: any, y: any, z: number | undefined, alpha: number[], beta: (this: {
    a: string;
}, arg1: string, arg2: number) => boolean, gamma: number | null, delta: number) {
}`, 'Annotate with type from JSDoc', 'annotate');
