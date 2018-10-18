/// <reference path="fourslash.ts"/>

////interface [|{| "isWriteAccess": true, "isDefinition": true |}Base|] { }
////namespace n {
////    var Base = class { };
////    interface I extends [|Base|] { }
////}

verify.singleReferenceGroup("interface Base");
