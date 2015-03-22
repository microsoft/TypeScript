/// <reference path='fourslash.ts' />

////interface Array<T> {
////    /*definition*/specialPop(): T
////}
////
////var strings: string[];
////var numbers: number[];
////
////var x = (strings || numbers)./*usage*/specialPop()

goTo.marker("usage");
verify.definitionCountIs(1);
goTo.definition();
verify.caretAtMarker("definition");
