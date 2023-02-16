/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// class Foo {
////     constructor(private [|privateParam|]: number,
////         public [|publicParam|]: string,
////         protected [|protectedParam|]: boolean) {
////
////         let localPrivate = [|privateParam|];
////         this.[|privateParam|] += 10;
////
////         let localPublic = [|publicParam|];
////         this.[|publicParam|] += " Hello!";
////
////         let localProtected = [|protectedParam|];
////         this.[|protectedParam|] = false;
////     }
//// }

verify.baselineDocumentHighlights();
