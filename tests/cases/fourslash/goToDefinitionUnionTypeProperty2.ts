/// <reference path='fourslash.ts' />
////interface HasAOrB {
////    /*propertyDefinition1*/a: string;
////    b: string;
////}
////
////interface One {
////    common: { /*propertyDefinition2*/a : number; };
////}
////
////interface Two {
////    common: HasAOrB;
////}
////
////var x : One | Two;
////
////x.common./*propertyReference*/a;

goTo.marker("propertyReference");
verify.definitionCountIs(2);
goTo.definition(0);
verify.caretAtMarker("propertyDefinition2");

goTo.marker("propertyReference");
goTo.definition(1);
verify.caretAtMarker("propertyDefinition1");
