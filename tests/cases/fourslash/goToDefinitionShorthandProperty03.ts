/// <reference path='fourslash.ts' />

////let /*def*/x = {
////    /*prop*/x
////}

goTo.marker("prop");
goTo.definition();
verify.caretAtMarker("def");