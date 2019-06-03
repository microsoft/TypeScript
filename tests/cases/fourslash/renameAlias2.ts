/// <reference path='fourslash.ts'/>

////[|module [|{| "declarationRangeIndex": 0 |}SomeModule|] { export class SomeClass { } }|]
////import M = [|SomeModule|];
////import C = M.SomeClass;

const [rDef, ...ranges] = test.ranges();
verify.rangesAreRenameLocations(ranges);