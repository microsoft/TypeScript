/// <reference path='fourslash.ts'/>

////module SomeModule { [|export class [|{| "declarationRangeIndex": 0 |}SomeClass|] { }|] }
////import M = SomeModule;
////import C = M.[|SomeClass|];

const [rDef, ...ranges] = test.ranges();
verify.rangesAreRenameLocations(ranges);
