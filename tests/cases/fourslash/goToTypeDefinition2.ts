/// <reference path='fourslash.ts' />

// @Filename: goToTypeDefinition2_Definition.ts
/////*definition*/interface I1 {
////    p;
////}
////type propertyType = I1;
////interface I2 {
////    property: propertyType;
////}

// @Filename: goToTypeDefinition2_Consumption.ts
////var i2: I2;
////i2.prop/*reference*/erty;

goTo.marker('reference');
goTo.type();
verify.caretAtMarker('definition');
