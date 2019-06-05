/// <reference path="fourslash.ts"/>

////[|var [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}Base|] = class { };|]
////class C extends [|Base|] { }

verify.singleReferenceGroup("var Base: typeof Base", "Base");
