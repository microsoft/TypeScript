/// <reference path='fourslash.ts'/>

////var [|x|] = 0;
////
////with ({}) {
////    var y = x;  // Reference of x here should not be picked
////    /*2*/y++;        // also reference for y should be ignored
////}
////
////[|x|] = [|x|] + 1;

verify.rangesReferenceEachOther();
