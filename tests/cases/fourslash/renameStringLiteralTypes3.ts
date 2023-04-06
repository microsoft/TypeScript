/// <reference path='fourslash.ts' />

////type Foo = "[|a|]" | "b";
////
////class C {
////    p: Foo = "[|a|]";
////    m() {
////        switch (this.p) {
////            case "[|a|]":
////                return 1;
////            case "b":
////                return 2;
////        }
////    }
////}

verify.baselineRenameAtRangesWithText("a");
