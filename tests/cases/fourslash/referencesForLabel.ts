/// <reference path='fourslash.ts'/>

// Valid References for a label

/////*1*/label: while (true) {
////    if (false) break /*2*/label;
////    if (true) continue /*3*/label;
////}
////
/////*4*/label: while (false) { }
////var label = "label";

goTo.marker("1");
verify.referencesCountIs(3);

goTo.marker("2");
verify.referencesCountIs(3);

goTo.marker("3");
verify.referencesCountIs(3);

goTo.marker("4");
verify.referencesCountIs(1);