/// <reference path='fourslash.ts'/>

// References to local inside a class.

////var n = 14;
////
////class foo {
////    private /*1*/n = 0;
////
////    public bar() {
////        this.n = 9;
////    }
////
////    constructor() {
////        this.n/*2*/ = 4;
////    }
////
////    public bar2() {
////        var n = 12;
////    }
////}

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker("1");
verify.referencesCountIs(3);

goTo.marker("2");
verify.referencesCountIs(3);