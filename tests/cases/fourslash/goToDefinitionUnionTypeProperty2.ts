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
////x.common.[|/*propertyReference*/a|];

verify.baselineGoToDefinition("propertyReference");
