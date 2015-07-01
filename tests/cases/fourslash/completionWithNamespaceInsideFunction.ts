/// <reference path='fourslash.ts'/>

////function f() {
////    namespace n {
////        interface I {
////            x: number
////        }
////        /*1*/
////    }
////    /*2*/
////}
/////*3*/

goTo.marker('1');
verify.completionListContains("f", "function f(): void");
verify.completionListContains("n", "namespace n");
verify.completionListContains("I", "interface I");

goTo.marker('2');
verify.completionListContains("f", "function f(): void");
verify.completionListContains("n", "namespace n");

goTo.marker('3');
verify.completionListContains("f", "function f(): void");