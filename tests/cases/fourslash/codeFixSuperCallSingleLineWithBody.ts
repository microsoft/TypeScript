/// <reference path='fourslash.ts' />

////class Base{
////}
////class C extends Base{
////    constructor() [|{ const t = 0; }|]
////}
// TODO: GH#18445
verify.rangeAfterCodeFix(`{\r
        super();\r
        const t = 0;\r
    }`, /*includeWhitespace*/ true);
