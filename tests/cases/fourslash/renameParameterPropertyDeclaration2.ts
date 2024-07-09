/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor([|public [|{| "contextRangeIndex": 0 |}publicParam|]: number|]) {
////         let publicParam = [|publicParam|];
////         this.[|publicParam|] += 10;
////     }
//// }

verify.baselineRenameAtRangesWithText("publicParam");
