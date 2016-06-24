/// <reference path='fourslash.ts'/>

// Global variable reference.

////var [|topLevelVar|] = 2;
////var topLevelVar2 = [|topLevelVar|];
////
////class [|topLevelClass|] { }
////var c = new [|topLevelClass|]();
////
////interface [|topLevelInterface|] { }
////var i: [|topLevelInterface|];
////
////module [|topLevelModule|] {
////    export var x;
////}
////var x = [|topLevelModule|].x;
////
////export = x;

verify.rangesWithSameTextReferenceEachOther();
