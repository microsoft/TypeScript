/// <reference path='fourslash.ts' />

////type Foo = "[|a|]" | "b";
////
////class C {
////    p: Foo = "[|a|]";
////    m() {
////        if (this.p === "[|a|]") {}
////        if ("[|a|]" === this.p) {}
////
////        if (this.p !== "[|a|]") {}
////        if ("[|a|]" !== this.p) {}
////
////        if (this.p == "[|a|]") {}
////        if ("[|a|]" == this.p) {}
////
////        if (this.p != "[|a|]") {}
////        if ("[|a|]" != this.p) {}
////    }
////}

verify.baselineRenameAtRangesWithText("a");
