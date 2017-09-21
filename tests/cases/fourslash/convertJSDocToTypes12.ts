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
    /**
     * @return {...*}
     */
    m(x): any[] {
    }
}`, 'Convert to Typescript type', 'convert');
