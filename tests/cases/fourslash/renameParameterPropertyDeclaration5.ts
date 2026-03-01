/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor([|protected [ [|{| "contextRangeIndex": 0 |}protectedParam|] ]|]) {
////         let myProtectedParam = [|protectedParam|];
////     }
//// }

verify.baselineRenameAtRangesWithText("protectedParam");
