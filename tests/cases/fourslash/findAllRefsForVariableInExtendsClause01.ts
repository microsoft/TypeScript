/// <reference path="fourslash.ts"/>

////[|var [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}Base|] = class { };|]
////class C extends [|Base|] { }

verify.singleReferenceGroup("var Base: typeof Base", "Base");
