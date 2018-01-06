/// <reference path='fourslash.ts' />
////class C {
////    /** @return {number} */
////    get /*1*/c() { return 12 }
////}
verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`class C {
    /** @return {number} */
    get c(): number { return 12; }
}`, 'Annotate with type from JSDoc', 'annotate');
