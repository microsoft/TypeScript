/// <reference path='fourslash.ts' />

/////*1*//** 1
//// */*2*/2
/////*3*/ 3*/
////
////class Foo {
/////*4*//**4
////    */*5*/5
/////*6*/                *6
/////*7*/          7*/
////    bar() {
/////*8*/                /**8
////    */*9*/9
/////*10*/                *10
/////*11*/                           *11
/////*12*/          12*/
////    }
////}
format.document();
goTo.marker('1');
verify.currentLineContentIs("/** 1");
goTo.marker('2');
verify.currentLineContentIs(" *2");
goTo.marker('3');
verify.currentLineContentIs(" 3*/");
goTo.marker('4');
verify.currentLineContentIs("    /**4");
goTo.marker('5');
verify.currentLineContentIs("        *5");
goTo.marker('6');
verify.currentLineContentIs("                    *6");
goTo.marker('7');
verify.currentLineContentIs("              7*/");
goTo.marker('8');
verify.currentLineContentIs("        /**8");
goTo.marker('9');
verify.currentLineContentIs("*9");
goTo.marker('10');
verify.currentLineContentIs("        *10");
goTo.marker('11');
verify.currentLineContentIs("                   *11");
goTo.marker('12');
verify.currentLineContentIs("  12*/");