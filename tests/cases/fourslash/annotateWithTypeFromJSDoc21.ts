/// <reference path='fourslash.ts' />
// @strict: true
/////**
//// * @return {number}
//// */
////function /*1*/f(x, y) {
////}
////
/////**
//// * @return {number}
//// */
////function /*2*/g(x, y): number {
////    return 0;
////}
/////**
//// * @param {number} x
//// */
////function /*3*/h(x: number, y): number {
////    return 0;
////}
////
/////**
//// * @param {number} x
//// * @param {string} y
//// */
////function /*4*/i(x: number, y: string) {
////}
/////**
//// * @param {number} x
//// * @return {boolean}
//// */
////function /*5*/j(x: number, y): boolean {
////    return true;
////}

verify.not.applicableRefactorAvailableAtMarker('2');
verify.not.applicableRefactorAvailableAtMarker('3');
verify.not.applicableRefactorAvailableAtMarker('4');
verify.not.applicableRefactorAvailableAtMarker('5');
verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`/**
 * @return {number}
 */
function f(x, y): number {
}

/**
 * @return {number}
 */
function g(x, y): number {
    return 0;
}
/**
 * @param {number} x
 */
function h(x: number, y): number {
    return 0;
}

/**
 * @param {number} x
 * @param {string} y
 */
function i(x: number, y: string) {
}
/**
 * @param {number} x
 * @return {boolean}
 */
function j(x: number, y): boolean {
    return true;
}`, 'Annotate with type from JSDoc', 'annotate');
