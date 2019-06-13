/// <reference path="fourslash.ts" />

////[|declare class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}C|] {
////    static m(): void;
////}|]

verify.singleReferenceGroup("class C", "C");
