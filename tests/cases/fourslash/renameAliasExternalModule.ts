/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////namespace SomeModule { export class SomeClass { } }
////export = SomeModule;

// @Filename: b.ts
////[|import [|{| "contextRangeIndex": 0 |}M|] = require("./a");|]
////import C = [|M|].SomeClass;

verify.baselineRenameAtRangesWithText("M");
