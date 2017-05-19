/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////module [|SomeModule|] { export class SomeClass { } }
////export = [|SomeModule|];

// @Filename: b.ts
////import [|M|] = require("./a");
////import C = [|M|].SomeClass;

const [r0, r1, r2, r3] = test.ranges();
verify.rangesAreRenameLocations([r0, r1]);
verify.rangesAreRenameLocations([r2, r3]);
