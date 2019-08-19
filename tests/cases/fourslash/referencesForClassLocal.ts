/// <reference path='fourslash.ts'/>

// References to local inside a class.

////var n = 14;
////
////class foo {
////    [|private [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}n|] = 0;|]
////
////    public bar() {
////        this.[|{| "isWriteAccess": true |}n|] = 9;
////    }
////
////    constructor() {
////        this.[|{| "isWriteAccess": true |}n|] = 4;
////    }
////
////    public bar2() {
////        var n = 12;
////    }
////}

verify.singleReferenceGroup("(property) foo.n: number", "n");
