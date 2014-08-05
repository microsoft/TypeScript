/// <reference path='fourslash.ts' />

////interface Number {
////    /*definition*/myObjectMethod(): number;
////}
////
////var o = 0;
////o./*reference1*/myObjectMethod();
////o["/*reference2*/myObjectMethod"]();

goTo.marker("reference1");
goTo.definition();
verify.caretAtMarker("definition");

goTo.marker("reference2");
goTo.definition();
verify.caretAtMarker("definition");
