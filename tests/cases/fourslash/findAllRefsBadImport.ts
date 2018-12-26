/// <reference path='fourslash.ts'/>

////import { [|ab|] as [|{| "isWriteAccess": true, "isDefinition": true |}cd|] } from "doesNotExist";

const [r0, r1]  = test.ranges();
verify.referenceGroups(r0, undefined);
verify.singleReferenceGroup("import cd", [r1]);
