/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(protected { [|protectedParam|] }) {
////         let myProtectedParam = [|protectedParam|];
////     }
//// }

verify.rangesAreRenameLocations();
