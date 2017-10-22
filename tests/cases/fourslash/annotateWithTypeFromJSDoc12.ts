/// <reference path='fourslash.ts' />

////class C {
////    /**
////     * @return {...*}
////     */
////    /*1*/m(x) {
////    }
////}
verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`class C {
    /**
     * @return {...*}
     */
    m(x): any[] {
    }
}`, 'Annotate with type from JSDoc', 'annotate');
