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

goTo.marker();
verify.memberListContains("C1");
verify.memberListContains("C2");
