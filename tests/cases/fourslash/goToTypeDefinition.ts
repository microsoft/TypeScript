/// <reference path='fourslash.ts' />

// @Filename: goToTypeDefinition_Definition.ts
/////*definition*/class C {
////    p;
////}
////var c: C;

// @Filename: goToTypeDefinition_Consumption.ts
/////*reference*/c = undefined;

goTo.marker('reference');
goTo.type();
verify.caretAtMarker('definition');
