/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor([|private [|{| "contextRangeIndex": 0 |}privateParam|]: number|]) {
////         let localPrivate = [|privateParam|];
////         this.[|privateParam|] += 10;
////     }
//// }

verify.baselineRenameAtRangesWithText("privateParam");
