/// <reference path='fourslash.ts' />

////interface One {
////    /*propertyDefinition1*/commonProperty: number;
////    commonFunction(): number;
////}
////
////interface Two {
////    /*propertyDefinition2*/commonProperty: string
////    commonFunction(): number;
////}
////
////var x : One | Two;
////
////x./*propertyReference*/commonProperty;
////x./*3*/commonFunction;

goTo.marker("propertyReference");
goTo.definition(0);
verify.caretAtMarker("propertyDefinition1");

goTo.marker("propertyReference");
goTo.definition(1);
verify.caretAtMarker("propertyDefinition2");
