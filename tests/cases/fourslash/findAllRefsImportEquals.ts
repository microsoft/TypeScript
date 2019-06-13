/// <reference path="fourslash.ts" />

////import j = N./**/ [|q|];
////namespace N { [|export const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 1 |}q|] = 0;|] }

goTo.marker();
verify.referenceGroups("", [{ definition: "const N.q: 0", ranges: test.rangesByText().get("q") }]);
