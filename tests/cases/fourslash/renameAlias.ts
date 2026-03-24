/// <reference path='fourslash.ts'/>

////namespace SomeModule { export class SomeClass { } }
////[|import [|{| "contextRangeIndex": 0 |}M|] = SomeModule;|]
////import C = [|M|].SomeClass;

verify.baselineRenameAtRangesWithText("M");
