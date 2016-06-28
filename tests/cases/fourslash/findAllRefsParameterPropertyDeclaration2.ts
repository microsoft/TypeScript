/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(public [|publicParam|]: number) {
////         let localPublic = [|publicParam|];
////         this.[|publicParam|] += 10;
////     }
//// }

verify.rangesReferenceEachOther();
