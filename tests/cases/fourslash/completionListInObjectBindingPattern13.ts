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

verify.completions({ marker: "", exact: ["x", "y"] });
