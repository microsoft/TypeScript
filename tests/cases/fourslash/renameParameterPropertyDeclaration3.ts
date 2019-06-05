/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor([|protected [|{| "declarationRangeIndex": 0 |}protectedParam|]: number|]) {
////         let protectedParam = [|protectedParam|];
////         this.[|protectedParam|] += 10;
////     }
//// }

verify.rangesWithSameTextAreRenameLocations("protectedParam");
