///<reference path="fourslash.ts" />

// In an inferred class, we can rename successfully

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// class Foo {
////    constructor() {
////        [|this.[|{| "contextRangeIndex": 0 |}union|] = 'foo';|]
////        [|this.[|{| "contextRangeIndex": 2 |}union|] = 100;|]
////    }
////    method() { return this.[|union|]; }
//// }
//// var x = new Foo();
//// x.[|union|];

verify.baselineRenameAtRangesWithText("union");
