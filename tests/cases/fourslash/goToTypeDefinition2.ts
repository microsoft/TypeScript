/// <reference path='fourslash.ts' />

// @Filename: goToTypeDefinition2_Definition.ts
////interface /*definition*/I1 {
////    p;
////}
////type propertyType = I1;
////interface I2 {
////    property: propertyType;
////}

// @Filename: goToTypeDefinition2_Consumption.ts
////var i2: I2;
////i2.prop/*reference*/erty;

verify.baselineGoToType("reference");
