/// <reference path='fourslash.ts'/>

////namespace SomeModule { [|export class [|{| "contextRangeIndex": 0 |}SomeClass|] { }|] }
////import M = SomeModule;
////import C = M.[|SomeClass|];

verify.baselineRenameAtRangesWithText("SomeClass");
