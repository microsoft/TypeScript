/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor([|protected { [|{| "declarationRangeIndex": 0 |}protectedParam|] }|]) {
////         let myProtectedParam = [|protectedParam|];
////     }
//// }

const [r0Def, r0, r1] = test.ranges();
verify.renameLocations([r0, r1], [{ range: r0, prefixText: "protectedParam: " }, r1]);
