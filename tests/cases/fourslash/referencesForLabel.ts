/// <reference path='fourslash.ts'/>

// Valid References for a label

/////*1*/label: while (true) {
////    if (false) /*2*/break /*3*/label;
////    if (true) /*4*/continue /*5*/label;
////}
////
/////*6*/label: while (false) { }
////var label = "label";

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6');
