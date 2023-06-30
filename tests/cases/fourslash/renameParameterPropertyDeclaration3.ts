/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor([|protected [|{| "contextRangeIndex": 0 |}protectedParam|]: number|]) {
////         let protectedParam = [|protectedParam|];
////         this.[|protectedParam|] += 10;
////     }
//// }

verify.baselineRenameAtRangesWithText("protectedParam");
