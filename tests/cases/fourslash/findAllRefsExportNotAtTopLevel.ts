/// <reference path="fourslash.ts" />

////{
////    export const [|{| "isWriteAccess": true, "isDefinition": true |}x|] = 0;
////    [|x|];
////}

verify.singleReferenceGroup("const x: 0");
