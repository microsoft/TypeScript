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
////function f(x, y, z, alpha, beta, gamma, delta, epsilon, zeta) {
////}

verify.codeFix({
    description: "Annotate with type from JSDoc",
    newFileContent:
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
}`,
});
