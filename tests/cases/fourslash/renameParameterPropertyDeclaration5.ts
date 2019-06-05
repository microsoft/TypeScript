/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor([|protected [ [|{| "declarationRangeIndex": 0 |}protectedParam|] ]|]) {
////         let myProtectedParam = [|protectedParam|];
////     }
//// }

verify.rangesWithSameTextAreRenameLocations("protectedParam");
