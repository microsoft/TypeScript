/// <reference path='fourslash.ts' />

////[|import * as [|{| "contextRangeIndex": 0 |}foo|] from 'bar';|]
////const bar = { [|foo|] };

const [r0Def, r0, r1] = test.ranges();
verify.baselineRename([r0, r1]);
