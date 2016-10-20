/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(protected [|protectedParam|]: number) {
////         let localProtected = [|protectedParam|];
////         this.[|protectedParam|] += 10;
////     }
//// }

verify.rangesReferenceEachOther();
