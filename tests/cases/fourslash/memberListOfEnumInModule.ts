/// <reference path='fourslash.ts'/>

////module Fixes {
////    enum Foo {
////        bar,
////        baz
////    }
////    var f: Foo = Foo./**/;
////}

goTo.marker();
verify.completionListContains("bar");
verify.completionListContains("baz");