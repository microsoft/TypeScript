/// <reference path='fourslash.ts'/>

////var [|{| "isWriteAccess": true, "isDefinition": true |}x|] = 0;
////
////with ({}) {
////    var y = x;  // Reference of x here should not be picked
////    /*2*/y++;        // also reference for y should be ignored
////}
////
////[|{| "isWriteAccess": true |}x|] = [|x|] + 1;

verify.singleReferenceGroup("var x: number");
