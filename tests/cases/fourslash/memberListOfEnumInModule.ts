/// <reference path='fourslash.ts'/>

////module Fixes {
////    enum Foo {
////        bar,
////        baz
////    }
////    var f: Foo = Foo./**/;
////}

goTo.marker();
verify.memberListContains("bar");
verify.memberListContains("baz");