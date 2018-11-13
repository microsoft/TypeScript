/// <reference path="fourslash.ts" />

////class C {
////    [|constructor|](n: number);
////    [|constructor|](){}
////}

verify.singleReferenceGroup("class C");
