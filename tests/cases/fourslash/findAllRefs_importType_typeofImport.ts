/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export const x = 0;

// @Filename: /b.ts
////[|const x: typeof import("[|{| "contextRangeIndex": 0 |}./a|]") = { x: 0 };|]
////[|const y: typeof import("[|{| "contextRangeIndex": 2 |}./a|]") = { x: 0 };|]

verify.singleReferenceGroup('module "/a"', "./a");
