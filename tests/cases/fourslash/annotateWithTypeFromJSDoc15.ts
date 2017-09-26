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
verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
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
function f(x: boolean, y, z, alpha, beta, gamma, delta, epsilon, zeta) {
}`, 'Annotate with type from JSDoc', 'annotate');

verify.applicableRefactorAvailableAtMarker('2');
verify.fileAfterApplyingRefactorAtMarker('2',
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
function f(x: boolean, y: string, z, alpha, beta, gamma, delta, epsilon, zeta) {
}`, 'Annotate with type from JSDoc', 'annotate');

verify.applicableRefactorAvailableAtMarker('3');
verify.fileAfterApplyingRefactorAtMarker('3',
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
function f(x: boolean, y: string, z: number, alpha, beta, gamma, delta, epsilon, zeta) {
}`, 'Annotate with type from JSDoc', 'annotate');

verify.applicableRefactorAvailableAtMarker('4');
verify.fileAfterApplyingRefactorAtMarker('4',
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
function f(x: boolean, y: string, z: number, alpha: object, beta, gamma, delta, epsilon, zeta) {
}`, 'Annotate with type from JSDoc', 'annotate');

verify.applicableRefactorAvailableAtMarker('5');
verify.fileAfterApplyingRefactorAtMarker('5',
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
function f(x: boolean, y: string, z: number, alpha: object, beta: Date, gamma, delta, epsilon, zeta) {
}`, 'Annotate with type from JSDoc', 'annotate');

verify.applicableRefactorAvailableAtMarker('6');
verify.fileAfterApplyingRefactorAtMarker('6',
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
function f(x: boolean, y: string, z: number, alpha: object, beta: Date, gamma: Promise<any>, delta, epsilon, zeta) {
}`, 'Annotate with type from JSDoc', 'annotate');

verify.applicableRefactorAvailableAtMarker('7');
verify.fileAfterApplyingRefactorAtMarker('7',
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
function f(x: boolean, y: string, z: number, alpha: object, beta: Date, gamma: Promise<any>, delta: Array<any>, epsilon, zeta) {
}`, 'Annotate with type from JSDoc', 'annotate');

verify.applicableRefactorAvailableAtMarker('8');
verify.fileAfterApplyingRefactorAtMarker('8',
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
function f(x: boolean, y: string, z: number, alpha: object, beta: Date, gamma: Promise<any>, delta: Array<any>, epsilon: Array<number>, zeta) {
}`, 'Annotate with type from JSDoc', 'annotate');

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
