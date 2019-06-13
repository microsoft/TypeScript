/// <reference path='fourslash.ts'/>

////declare module "jquery" {
////    function $(s: string): any;
////    export = $;
////}

////[|import [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}$|] = require("jquery");|]
////[|$|]("a");

////[|import [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 3 |}$|] = require("jquery");|]

const [r0Def, r0, r1, r2Def, r2] = test.ranges();
verify.singleReferenceGroup('import $ = require("jquery")', [r0, r1]);
verify.singleReferenceGroup('import $ = require("jquery")', [r2]);
