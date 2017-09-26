/// <reference path='fourslash.ts' />
/////**
//// * @param {number} x - the first parameter
//// * @param {{ a: string, b: Date }} y - the most complex parameter
//// * @param z - the best parameter
//// * @param alpha - the other best parameter
//// * @param {*} beta - I have no idea how this got here
//// */
////function f(/*1*/x, /*2*/y, /*3*/z: string, /*4*/alpha, /*5*/beta) {
////}

verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`/**
 * @param {number} x - the first parameter
 * @param {{ a: string, b: Date }} y - the most complex parameter
 * @param z - the best parameter
 * @param alpha - the other best parameter
 * @param {*} beta - I have no idea how this got here
 */
function f(x: number, y, z: string, alpha, beta) {
}`, 'Annotate with type from JSDoc', 'annotate');

verify.applicableRefactorAvailableAtMarker('2');
verify.fileAfterApplyingRefactorAtMarker('2',
`/**
 * @param {number} x - the first parameter
 * @param {{ a: string, b: Date }} y - the most complex parameter
 * @param z - the best parameter
 * @param alpha - the other best parameter
 * @param {*} beta - I have no idea how this got here
 */
function f(x: number, y: {
    a: string;
    b: Date;
}, z: string, alpha, beta) {
}`, 'Annotate with type from JSDoc', 'annotate');

verify.not.applicableRefactorAvailableAtMarker('3');
verify.not.applicableRefactorAvailableAtMarker('4');
verify.applicableRefactorAvailableAtMarker('5');
verify.fileAfterApplyingRefactorAtMarker('5',
`/**
 * @param {number} x - the first parameter
 * @param {{ a: string, b: Date }} y - the most complex parameter
 * @param z - the best parameter
 * @param alpha - the other best parameter
 * @param {*} beta - I have no idea how this got here
 */
function f(x: number, y: {
    a: string;
    b: Date;
}, z: string, alpha, beta: any) {
}`, 'Annotate with type from JSDoc', 'annotate');
