/// <reference path='fourslash.ts'/>

////module SomeModule { [|export class [|{| "declarationRangeIndex": 0 |}SomeClass|] { }|] }
////import M = SomeModule;
////import C = M.[|SomeClass|];

verify.rangesWithSameTextAreRenameLocations("SomeClass");
