/// <reference path='fourslash.ts'/>

// Class references should work across file and not find local variables.

// @Filename: referenceToClass_1.ts
////class /*1*/foo {
////    public n: /*2*/foo;
////    public foo: number;
////}
////
////class bar {
////    public n: /*3*/foo;
////    public k = new /*4*/foo();
////}
////
////module mod {
////    var k: /*5*/foo = null;
////}

// @Filename: referenceToClass_2.ts
////var k: /*6*/foo;

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6')
