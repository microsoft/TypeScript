/// <reference path='fourslash.ts'/>

// References to a label outside function bounderies

/////*1*/label: function foo(label) {
////    while (true) {
////        /*2*/break /*3*/label;
////    }
////}

verify.baselineFindAllReferences('1', '2', '3');
