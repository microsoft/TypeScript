/// <reference path="fourslash.ts" />

////[|declare class [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}C|] {
////    static m(): void;
////}|]

verify.singleReferenceGroup("class C", "C");
