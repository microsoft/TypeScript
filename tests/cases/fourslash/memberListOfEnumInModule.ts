/// <reference path='fourslash.ts'/>

////module BugFixes {
////    enum Foo {
////        bar,
////        baz
////    }
////    var f: Foo = Foo./**/;
////}

goTo.marker();
verify.memberListContains("bar");
verify.memberListContains("baz");