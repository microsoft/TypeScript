/// <reference path="fourslash.ts" />

////class C {
////    [|constructor|](n: number);
////    [|constructor|](){}
////}

verify.singleReferenceGroup("constructor C(n: number): C");
