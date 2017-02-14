/// <reference path='fourslash.ts'/>

// Global variable reference.

////var [|{| "isWriteAccess": true, "isDefinition": true |}topLevelVar|] = 2;
////var topLevelVar2 = [|topLevelVar|];
////
////class [|{| "isWriteAccess": true, "isDefinition": true |}topLevelClass|] { }
////var c = new [|topLevelClass|]();
////
////interface [|{| "isWriteAccess": true, "isDefinition": true |}topLevelInterface|] { }
////var i: [|topLevelInterface|];
////
////module [|{| "isWriteAccess": true, "isDefinition": true |}topLevelModule|] {
////    export var x;
////}
////var x = [|topLevelModule|].x;
////
////export = x;

const ranges = test.rangesByText();
verify.singleReferenceGroup("var topLevelVar: number", ranges.get("topLevelVar"));

const topLevelClass = ranges.get("topLevelClass");
verify.referenceGroups(topLevelClass[0], [{ definition: "class topLevelClass", ranges: topLevelClass }]);
verify.referenceGroups(topLevelClass[1], [{ definition: "constructor topLevelClass(): topLevelClass", ranges: topLevelClass }]);

verify.singleReferenceGroup("interface topLevelInterface", ranges.get("topLevelInterface"));
verify.singleReferenceGroup("namespace topLevelModule", ranges.get("topLevelModule"));
