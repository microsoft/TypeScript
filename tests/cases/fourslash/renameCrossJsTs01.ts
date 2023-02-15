/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////[|exports.[|{| "contextRangeIndex": 0 |}area|] = function (r) { return r * r; }|]

// @Filename: b.ts
////[|import { [|{| "contextRangeIndex": 2 |}area|] } from './a';|]
////var t = [|area|](10);

const [r0Def, r0, r1Def, r1, r2] = test.ranges();
verify.baselineRename([r0, r1, r2]);
