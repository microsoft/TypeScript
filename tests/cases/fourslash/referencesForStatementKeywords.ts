/// <reference path='fourslash.ts'/>

// @filename: /a.ts
////[|import /*typeKeyword*/type { T } from "[|{| "contextRangeDelta": -1 |}./b|]";|]

// @filename: /b.ts
////export type T = number;

const [, importRef] = test.ranges();
verify.referenceGroups("typeKeyword", [{ definition: "module \"/b\"", ranges: [importRef] }]);