/// <reference path='fourslash.ts'/>

// Class references should work across file and not find local variables.

// @Filename: referenceToClass_1.ts
////class [|foo|] {
////    public n: [|foo|];
////    public foo: number;
////}
////
////class bar {
////    public n: [|foo|];
////    public k = new [|foo|]();
////}
////
////module mod {
////    var k: [|foo|] = null;
////}

// @Filename: referenceToClass_2.ts
////var k: [|foo|];

verify.rangesReferenceEachOther();
