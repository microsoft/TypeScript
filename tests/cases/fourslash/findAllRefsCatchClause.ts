/// <reference path="fourslash.ts" />

////try { }
////catch ([|{| "isWriteAccess": true, "isDefinition": true |}err|]) {
////    [|err|];
////}

verify.singleReferenceGroup("var err: any");
