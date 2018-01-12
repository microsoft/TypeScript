/// <reference path='fourslash.ts' />
// @strict: true
////
/////** @param {Object<string, boolean>} sb
////  * @param {Object<number, string>} ns */
////function /*1*/f(sb, ns) {
////}
verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`
/** @param {Object<string, boolean>} sb
  * @param {Object<number, string>} ns */
function f(sb: { [s: string]: boolean; }, ns: { [n: number]: string; }) {
}`, 'Annotate with type from JSDoc', 'annotate');
