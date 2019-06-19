/// <reference path='fourslash.ts'/>

////[|declare module "[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}foo|]" {
////    [|var [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}f|]: number;|]
////}|]
////
////[|declare module "[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}bar|]" {
////    [|export import [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}foo|] = require("[|{| "contextRangeIndex": 6 |}foo|]");|]
////    var f2: typeof [|foo|].[|f|];
////}|]
////
////declare module "baz" {
////    [|import bar = require("[|{| "contextRangeIndex": 11 |}bar|]");|]
////    var f2: typeof bar.[|foo|];
////}

const [moduleFoo0Def, moduleFoo0, f0Def, f0, moduleBar0Def, moduleBar0, foo0Def, foo0, moduleFoo1, foo1, f1, moduleBar1Def, moduleBar1, foo2] = test.ranges();
verify.singleReferenceGroup('module "foo"', [moduleFoo0, moduleFoo1]);
verify.singleReferenceGroup('module "bar"', [moduleBar0, moduleBar1]);
verify.singleReferenceGroup('(alias) module "foo"\nimport foo = require("foo")', [foo0, foo1, foo2]);
verify.singleReferenceGroup("var f: number", [f0, f1]);
