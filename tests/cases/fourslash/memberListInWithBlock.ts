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
verify.completionListIsEmpty();

goTo.marker('2');
// Only keywords should show in completion, no members or types
verify.not.completionListContains("foo");
verify.not.completionListContains("f");
verify.not.completionListContains("c");
verify.not.completionListContains("d");
verify.not.completionListContains("x");
verify.not.completionListContains("Object");
