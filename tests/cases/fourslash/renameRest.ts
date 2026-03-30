/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number;
////    [|[|{| "contextRangeIndex": 0 |}parent|]: Gen;|]
////    millennial: string;
////}
////let t: Gen;
////var { x, ...rest } = t;
////rest.[|parent|];

verify.baselineRenameAtRangesWithText("parent");
