/// <reference path="fourslash.ts"/>

////enum E { [|{| "isWriteAccess": true, "isDefinition": true |}A|], B }
////const e: E.[|A|] = E.[|A|];

verify.singleReferenceGroup("(enum member) E.A = 0");
