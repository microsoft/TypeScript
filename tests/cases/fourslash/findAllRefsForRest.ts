/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number
////    [|{| "isDefinition": true |}parent|]: Gen;
////    millenial: string;
////}
////let t: Gen;
////var { x, ...rest } = t;
////rest.[|parent|];

verify.singleReferenceGroup("(property) Gen.parent: Gen");
