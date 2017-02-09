/// <reference path="fourslash.ts"/>

////var [|{| "isWriteAccess": true, "isDefinition": true |}Base|] = class { };
////class C extends [|Base|] { }

verify.singleReferenceGroup("var Base: typeof (Anonymous class)");
