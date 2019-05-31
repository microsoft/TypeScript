/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor([|public [|{| "declarationRangeIndex": 0 |}publicParam|]: number|]) {
////         let publicParam = [|publicParam|];
////         this.[|publicParam|] += 10;
////     }
//// }

const [rDef, ...rest] = test.ranges();
verify.rangesAreRenameLocations(rest);
