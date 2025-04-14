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
////x.[|/*propertyReference*/commonProperty|];
////x./*3*/commonFunction;

verify.baselineGoToDefinition("propertyReference");
