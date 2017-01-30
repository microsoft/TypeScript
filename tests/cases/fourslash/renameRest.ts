/// <reference path='fourslash.ts'/>
////interface Gen {
////    x: number;
////    [|parent|]: Gen;
////    millenial: string;
////}
////let t: Gen;
////var { x, ...rest } = t;
////rest.[|parent|];

verify.rangesAreRenameLocations();
