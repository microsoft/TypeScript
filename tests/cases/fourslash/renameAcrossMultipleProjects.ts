/// <reference path="fourslash.ts" />

//@Filename: a.ts
////[|var [|{| "contextRangeIndex": 0 |}x|]: number;|]

//@Filename: b.ts
/////// <reference path="a.ts" />
////[|x|]++;

//@Filename: c.ts
/////// <reference path="a.ts" />
////[|x|]++;

verify.baselineRenameAtRangesWithText("x");
