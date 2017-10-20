/// <reference path='fourslash.ts' />
////class C {
////    /**
////     * @param {number} x - the first parameter
////     */
////    constructor(/*1*/x) {
////    }
////}
verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`class C {
    /**
     * @param {number} x - the first parameter
     */
    constructor(x: number) {
    }
}`, 'Annotate with type from JSDoc', 'annotate');

