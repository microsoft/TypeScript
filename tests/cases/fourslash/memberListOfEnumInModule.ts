/// <reference path='fourslash.ts'/>

////module Fixes {
////    enum Foo {
////        bar,
////        baz
////    }
////    var f: Foo = Foo./**/;
////}

verify.completions({ marker: "", exact: ["bar", "baz"] });
