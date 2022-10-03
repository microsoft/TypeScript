/// <reference path='fourslash.ts' />

////module M1 {
////    export class C1 {
////    }
////    export class C2 {
////    }
////}
////var x: M1./**/
////module M2 {
////    export class Test3 {
////    }
////}

verify.completions({ marker: "", exact: ["C1", "C2"] });
