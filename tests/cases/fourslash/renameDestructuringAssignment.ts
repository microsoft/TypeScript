/// <reference path='fourslash.ts' />

////interface I {
////    [|[|{| "declarationRangeIndex": 0 |}x|]: number;|]
////}
////var a: I;
////var x;
////([|{ [|{| "declarationRangeIndex": 2 |}x|]: x } = a|]);

verify.rangesWithSameTextAreRenameLocations("x");
