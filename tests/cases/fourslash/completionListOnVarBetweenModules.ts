/// <reference path='fourslash.ts' />

////namespace M1 {
////    export class C1 {
////    }
////    export class C2 {
////    }
////}
////var x: M1./**/
////namespace M2 {
////    export class Test3 {
////    }
////}

verify.completions({ marker: "", exact: ["C1", "C2"] });
