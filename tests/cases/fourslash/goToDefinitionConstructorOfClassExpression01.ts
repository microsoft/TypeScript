/// <reference path='fourslash.ts' />

////var x = class C {
////    /*definition*/constructor() {
////        var other = new /*usage*/C;
////    }
////}

goTo.marker("usage");
goTo.definition();
verify.caretAtMarker("definition");