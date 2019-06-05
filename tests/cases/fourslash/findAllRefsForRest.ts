/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number
////    [|[|{| "isDefinition": true, "declarationRangeIndex": 0 |}parent|]: Gen;|]
////    millenial: string;
////}
////let t: Gen;
////var { x, ...rest } = t;
////rest.[|parent|];

verify.singleReferenceGroup("(property) Gen.parent: Gen", "parent");
