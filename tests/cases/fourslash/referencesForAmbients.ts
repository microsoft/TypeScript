/// <reference path='fourslash.ts'/>

////declare module "[|{| "isWriteAccess": true, "isDefinition": true |}foo|]" {
////    var [|{| "isWriteAccess": true, "isDefinition": true |}f|]: number;
////}
////
////declare module "[|{| "isWriteAccess": true, "isDefinition": true |}bar|]" {
////    export import [|{| "isWriteAccess": true, "isDefinition": true |}foo|] = require("[|foo|]");
////    var f2: typeof [|foo|].[|f|];
////}
////
////declare module "baz" {
////    import bar = require("[|bar|]");
////    var f2: typeof bar.[|foo|];
////}

const [moduleFoo0, f0, moduleBar0, foo0, moduleFoo1, foo1, f1, moduleBar1, foo2] = test.ranges();
verify.singleReferenceGroup('module "foo"', [moduleFoo1, moduleFoo0]);
verify.singleReferenceGroup('module "bar"', [moduleBar1, moduleBar0]);
verify.singleReferenceGroup('import foo = require("foo")', [foo0, foo1, foo2]);
verify.singleReferenceGroup("var f: number", [f0, f1]);
