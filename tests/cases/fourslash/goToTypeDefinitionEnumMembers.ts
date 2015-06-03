/// <reference path='fourslash.ts' />

/////*definition*/enum E {
////    value1,
////    value2
////}
////var x = E.value2;
////
/////*reference*/x;

goTo.marker('reference');
goTo.type();
verify.caretAtMarker('definition');
