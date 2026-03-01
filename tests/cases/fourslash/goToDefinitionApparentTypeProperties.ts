/// <reference path='fourslash.ts' />

////interface Number {
////    /*definition*/myObjectMethod(): number;
////}
////
////var o = 0;
////o.[|/*reference1*/myObjectMethod|]();
////o[[|"/*reference2*/myObjectMethod"|]]();

verify.baselineGoToDefinition("reference1", "reference2");
