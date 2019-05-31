/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number;
////    [|[|{| "declarationRangeIndex": 0 |}parent|]: Gen;|]
////    millenial: string;
////}
////let t: Gen;
////var { x, ...rest } = t;
////rest.[|parent|];


const rangesByText = test.rangesByText();
verify.rangesAreRenameLocations(rangesByText.get("parent"));
