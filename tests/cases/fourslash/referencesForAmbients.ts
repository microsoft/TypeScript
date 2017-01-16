/// <reference path='fourslash.ts'/>

////declare module "[|foo|]" {
////    var [|f|]: number;
////}
////
////declare module "[|bar|]" {
////    export import [|foo|] = require("[|foo|]");
////    var f2: typeof [|foo|].[|f|];
////}
////
////declare module "baz" {
////    import bar = require("[|bar|]");
////    var f2: typeof bar.[|foo|];
////}

const [moduleFoo0, f0, moduleBar0, foo0, moduleFoo1, foo1, f1, moduleBar1, foo2] = test.ranges();
verify.rangesReferenceEachOther([moduleFoo0, moduleFoo1]);
verify.rangesReferenceEachOther([moduleBar0, moduleBar1]);
verify.rangesReferenceEachOther([foo0, foo1, foo2]);
verify.rangesReferenceEachOther([f0, f1]);
