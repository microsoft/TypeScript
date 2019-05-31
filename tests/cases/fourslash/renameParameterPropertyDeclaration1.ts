/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor([|private [|{| "declarationRangeIndex": 0 |}privateParam|]: number|]) {
////         let localPrivate = [|privateParam|];
////         this.[|privateParam|] += 10;
////     }
//// }

const [rDef, ...rest] = test.ranges();
verify.rangesAreRenameLocations(rest);
