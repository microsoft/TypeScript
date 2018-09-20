/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(public [|publicParam|]: number) {
////         let publicParam = [|publicParam|];
////         this.[|publicParam|] += 10;
////     }
//// }

verify.rangesAreRenameLocations();
