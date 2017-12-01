/// <reference path='fourslash.ts'/>

////module [|SomeModule|] { export class SomeClass { } }
////import M = [|SomeModule|];
////import C = M.SomeClass;

verify.rangesAreRenameLocations();