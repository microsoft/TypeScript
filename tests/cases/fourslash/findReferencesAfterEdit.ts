/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////interface A {
////    /*1*/foo: string;
////}

// @Filename: b.ts
///////<reference path='a.ts'/>
/////**/
////function foo(x: A) {
////    x./*2*/foo
////}

verify.baselineFindAllReferences("1", "2");
goTo.marker("");
edit.insert("\n");
verify.baselineFindAllReferences("1", "2");