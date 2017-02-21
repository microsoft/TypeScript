/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(protected [|protectedParam|]: number) {
////         let protectedParam = [|protectedParam|];
////         this.[|protectedParam|] += 10;
////     }
//// }

verify.rangesAreRenameLocations();
