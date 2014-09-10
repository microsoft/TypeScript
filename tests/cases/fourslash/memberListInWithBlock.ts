/// <reference path='fourslash.ts'/>

////class c {
////    static x: number;
////    public foo() {
////        with ({}) {
////            function f() { }
////            var d = this./*1*/foo;
////            /*2*/
////        }
////    }
////}

goTo.marker('1');
verify.memberListIsEmpty();

goTo.marker('2');
verify.not.completionListContains("foo");
verify.not.completionListContains("f");
verify.not.completionListContains("c");
verify.not.completionListContains("d");
verify.not.completionListContains("x");
