/// <reference path='fourslash.ts'/>

// References to local inside a class.

////var n = 14;
////
////class foo {
////    private [|{| "isWriteAccess": true, "isDefinition": true |}n|] = 0;
////
////    public bar() {
////        this.[|n|] = 9;
////    }
////
////    constructor() {
////        this.[|n|] = 4;
////    }
////
////    public bar2() {
////        var n = 12;
////    }
////}

verify.singleReferenceGroup("(property) foo.n: number");
