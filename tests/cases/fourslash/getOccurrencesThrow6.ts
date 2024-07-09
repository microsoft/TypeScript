/// <reference path='fourslash.ts' />

////[|throw|] 100;
////
////try {
////    throw 0;
////    var x = () => { throw 0; };
////}
////catch (y) {
////    var x = () => { throw 0; };
////    [|throw|] 200;
////}
////finally {
////    [|throw|] 300;
////}

verify.baselineDocumentHighlights();
