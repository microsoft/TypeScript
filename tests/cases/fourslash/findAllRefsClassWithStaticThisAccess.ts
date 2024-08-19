/// <reference path="fourslash.ts" />

////[|class /*0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}C|] {
////    static s() {
////        /*1*/[|this|];
////    }
////    static get f() {
////        return /*2*/[|this|];
////
////        function inner() { this; }
////        class Inner { x = this; }
////    }
////}|]

const [r0Def, r0, r1, r2] = test.ranges();

verify.baselineFindAllReferences('0', '1', '2');
verify.baselineRename(r0)
