/// <reference path='fourslash.ts' />
// @strict: true
/////**
//// * @param {Boolean} x
//// * @param {String} y
//// * @param {Number} z
//// * @param {Object} alpha
//// * @param {date} beta
//// * @param {promise} gamma
//// * @param {array} delta
//// * @param {Array<number>} epsilon
//// * @param {promise<String>} zeta
//// */
////function f(/*1*/x, /*2*/y, /*3*/z, /*4*/alpha, /*5*/beta, /*6*/gamma, /*7*/delta, /*8*/epsilon, /*9*/zeta) {
////}
verify.applicableRefactorAvailableAtMarker('9');
verify.fileAfterApplyingRefactorAtMarker('9',
`/**
 * @param {Boolean} x
 * @param {String} y
 * @param {Number} z
 * @param {Object} alpha
 * @param {date} beta
 * @param {promise} gamma
 * @param {array} delta
 * @param {Array<number>} epsilon
 * @param {promise<String>} zeta
 */
function f(x: boolean, y: string, z: number, alpha: object, beta: Date, gamma: Promise<any>, delta: Array<any>, epsilon: Array<number>, zeta: Promise<string>) {
}`, 'Annotate with type from JSDoc', 'annotate');
