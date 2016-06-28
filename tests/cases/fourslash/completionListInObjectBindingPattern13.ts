/// <reference path='fourslash.ts'/>

////interface I {
////    x: number;
////    y: string;
////    z: boolean;
////}
////
////interface J {
////    x: string;
////    y: string;
////}
////
////let { /**/ }: I | J = { x: 10 };

goTo.marker();
verify.completionListContains("x");
verify.completionListContains("y");
verify.not.completionListContains("z");
verify.not.completionListAllowsNewIdentifier();