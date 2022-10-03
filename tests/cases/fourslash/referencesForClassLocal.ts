/// <reference path='fourslash.ts'/>

// References to local inside a class.

////var n = 14;
////
////class foo {
////    /*1*/private /*2*/n = 0;
////
////    public bar() {
////        this./*3*/n = 9;
////    }
////
////    constructor() {
////        this./*4*/n = 4;
////    }
////
////    public bar2() {
////        var n = 12;
////    }
////}

verify.baselineFindAllReferences('1', '2', '3', '4');
