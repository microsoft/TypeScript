/// <reference path='fourslash.ts'/>

// References to a label outside function bounderies

/////*1*/label: function foo(label) {
////    while (true) {
////        break /*2*/label;
////    }
////}

goTo.marker("1");
verify.referencesCountIs(2);

goTo.marker("2");
verify.referencesCountIs(2);
