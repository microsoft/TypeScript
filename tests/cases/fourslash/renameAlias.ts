/// <reference path='fourslash.ts'/>

////module SomeModule { export class SomeClass { } }
////[|import [|{| "declarationRangeIndex": 0 |}M|] = SomeModule;|]
////import C = [|M|].SomeClass;

verify.rangesWithSameTextAreRenameLocations("M");
