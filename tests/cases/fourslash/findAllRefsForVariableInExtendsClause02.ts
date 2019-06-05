/// <reference path="fourslash.ts"/>

////[|interface [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}Base|] { }|]
////namespace n {
////    var Base = class { };
////    interface I extends [|Base|] { }
////}

verify.singleReferenceGroup("interface Base", "Base");
