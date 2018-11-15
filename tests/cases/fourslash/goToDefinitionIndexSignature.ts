/// <reference path='fourslash.ts'/>

////interface I {
////    /*defI*/[x: string]: boolean;
////}
////interface J {
////    /*defJ*/[x: string]: number;
////}
////declare const i: I;
////i.[|/*useI*/foo|];
////declare const ij: I | J;
////ij.[|/*useIJ*/foo|];

verify.goToDefinition("useI", ["defI"]);
verify.goToDefinition("useIJ", ["defI", "defJ"]);
