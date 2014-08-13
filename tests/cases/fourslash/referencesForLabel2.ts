/// <reference path='fourslash.ts'/>

// References to undefined label

////var label = "label";
////while (true) {
////    if (false) break /*1*/label;
////    if (true) continue label;
////}

goTo.marker("1");
verify.referencesCountIs(2);
