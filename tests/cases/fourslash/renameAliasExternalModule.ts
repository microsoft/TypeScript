/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////module SomeModule { export class SomeClass { } }
////export = SomeModule;

// @Filename: b.ts
////[|import [|{| "declarationRangeIndex": 0 |}M|] = require("./a");|]
////import C = [|M|].SomeClass;

const [rDef, ...ranges] = test.ranges();
verify.rangesAreRenameLocations(ranges);
