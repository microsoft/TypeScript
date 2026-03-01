/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////[|module [|{| "contextRangeIndex": 0 |}SomeModule|] { export class SomeClass { } }|]
////[|export = [|{| "contextRangeIndex": 2 |}SomeModule|];|]

// @Filename: b.ts
////[|import [|{| "contextRangeIndex": 4 |}M|] = require("./a");|]
////import C = [|M|].SomeClass;

const [r0Def, r0, r1Def, r1, r2Def, r2, r3] = test.ranges();
verify.baselineRename([r0, r1, r2, r3]);
