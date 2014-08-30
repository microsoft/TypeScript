/// <reference path='fourslash.ts'/>

// References to unused label

/////*1*/label: while (true) {
////    var label = "label";
////}

goTo.marker("1");
verify.referencesCountIs(1);
