/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////namespace SomeModule { [|export class [|{| "contextRangeIndex": 0 |}SomeClass|] { }|] }
////export = SomeModule;

// @Filename: b.ts
////import M = require("./a");
////import C = M.[|SomeClass|];

verify.baselineRenameAtRangesWithText("SomeClass");
