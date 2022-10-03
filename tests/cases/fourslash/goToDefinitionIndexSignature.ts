/// <reference path='fourslash.ts'/>

////interface I {
////    /*defI*/[x: string]: boolean;
////}
////interface J {
////    /*defJ*/[x: string]: number;
////}
////interface K {
////    /*defa*/[x: `a${string}`]: string;
////    /*defb*/[x: `${string}b`]: string;
////}
////declare const i: I;
////i.[|/*useI*/foo|];
////declare const ij: I | J;
////ij.[|/*useIJ*/foo|];
////declare const k: K;
////k.[|/*usea*/a|];
////k.[|/*useb*/b|];
////k.[|/*useab*/ab|];

verify.goToDefinition("useI", ["defI"]);
verify.goToDefinition("useIJ", ["defI", "defJ"]);
verify.goToDefinition("usea", ["defa"]);
verify.goToDefinition("useb", ["defb"]);
verify.goToDefinition("useab", ["defa", "defb"]);
