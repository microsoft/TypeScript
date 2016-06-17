/// <reference path="fourslash.ts"/>

////interface [|Base|] { }
////namespace n {
////    var Base = class { };
////    interface I extends [|Base|] { }
////}

verify.rangesReferenceEachOther();
