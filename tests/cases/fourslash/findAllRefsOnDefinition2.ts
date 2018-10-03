/// <reference path="fourslash.ts" />

//@Filename: findAllRefsOnDefinition2-import.ts
////export module Test{
////
////    export interface [|{| "isWriteAccess": true, "isDefinition": true |}start|] { }
////
////    export interface stop { }
////}

//@Filename: findAllRefsOnDefinition2.ts
////import Second = require("./findAllRefsOnDefinition2-import");
////
////var start: Second.Test.[|start|];
////var stop: Second.Test.stop;

verify.singleReferenceGroup("interface Test.start");
