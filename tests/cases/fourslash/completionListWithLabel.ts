/// <reference path="fourslash.ts"/>

//// label: while (true) {
////    break /*1*/
////    continue /*2*/
////    testlabel: while (true) {
////        break /*3*/
////        continue /*4*/
////        break tes/*5*/
////        continue tes/*6*/
////    }
////    break /*7*/
////    break; /*8*/
////}

goTo.marker("1");
verify.completionListContains("label");

goTo.marker("2");
verify.completionListContains("label");
verify.not.completionListContains("testlabel");

goTo.marker("3");
verify.completionListContains("label");
verify.completionListContains("testlabel");

goTo.marker("4");
verify.completionListContains("label");
verify.completionListContains("testlabel");

goTo.marker("5");
verify.completionListContains("testlabel");
verify.completionListContains("label");

goTo.marker("6");
verify.completionListContains("testlabel");
verify.completionListContains("label");

goTo.marker("7");
verify.completionListContains("label");
verify.not.completionListContains("testlabel");

goTo.marker("8");
verify.not.completionListContains("label");
