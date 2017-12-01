/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(private [|privateParam|]: number) {
////         let localPrivate = [|privateParam|];
////         this.[|privateParam|] += 10;
////     }
//// }

verify.rangesAreRenameLocations();
