/// <reference path='fourslash.ts'/>

// Global variable reference.

////[|var [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}topLevelVar|] = 2;|]
////var topLevelVar2 = [|topLevelVar|];
////
////[|class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 3 |}topLevelClass|] { }|]
////var c = new [|topLevelClass|]();
////
////[|interface [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}topLevelInterface|] { }|]
////var i: [|topLevelInterface|];
////
////[|module [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 9 |}topLevelModule|] {
////    export var x;
////}|]
////var x = [|topLevelModule|].x;
////
////export = x;

verify.singleReferenceGroup("var topLevelVar: number", "topLevelVar");
verify.singleReferenceGroup("class topLevelClass", "topLevelClass");
verify.singleReferenceGroup("interface topLevelInterface", "topLevelInterface");
verify.singleReferenceGroup("namespace topLevelModule", "topLevelModule");
