/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////interface A {
////    [|foo|]: string;
////}

// @Filename: b.ts
///////<reference path='a.ts'/>
/////**/
////function foo(x: A) {
////    x.[|foo|]
////}

verify.rangesReferenceEachOther();

goTo.marker("");
edit.insert("\r\n");

verify.rangesReferenceEachOther();
