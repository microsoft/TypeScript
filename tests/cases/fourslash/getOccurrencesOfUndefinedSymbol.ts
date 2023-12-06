/// <reference path='fourslash.ts' />

////var obj1: {
////    (bar: any): any;
////    new (bar: any): any;
////    [bar: any]: any;
////    bar: any;
////    foob(bar: any): any;
////};
////
////class cls3 {
////    property zeFunc() {
////    super.ceFun/**/c();
////}
////}


// "any" should not be highlighted
verify.baselineDocumentHighlights("");
