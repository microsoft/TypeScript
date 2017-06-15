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
////function f2() {
////    namespace n2 {
////        class I2 {
////            x: number
////        }
////        /*11*/
////    }
////    /*22*/
////}
/////*33*/

goTo.marker('1');
verify.completionListContains("f", "function f(): void");
verify.not.completionListContains("n", "namespace n");
verify.not.completionListContains("I", "interface I");

goTo.marker('2');
verify.completionListContains("f", "function f(): void");
verify.not.completionListContains("n", "namespace n");

goTo.marker('3');
verify.completionListContains("f", "function f(): void");

goTo.marker('11');
verify.completionListContains("f2", "function f2(): void");
verify.completionListContains("n2", "namespace n2");
verify.completionListContains("I2", "class I2");

goTo.marker('22');
verify.completionListContains("f2", "function f2(): void");
verify.completionListContains("n2", "namespace n2");

goTo.marker('33');
verify.completionListContains("f2", "function f2(): void");