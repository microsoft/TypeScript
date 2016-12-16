/// <reference path='fourslash.ts' />

////enum E {
////    value1,
////    /*definition*/value2
////}
////var x = E.value2;
////
/////*reference*/x;

goTo.marker('reference');
goTo.type();
verify.caretAtMarker('definition');
