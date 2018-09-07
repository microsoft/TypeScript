/// <reference path="fourslash.ts" />

////declare class [|{| "isWriteAccess": true, "isDefinition": true |}C|] {
////    static m(): void;
////}

verify.singleReferenceGroup("class C");
