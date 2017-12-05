/// <reference path='fourslash.ts' />

////class Base{
////}
////class C extends Base{
////    constructor() [|{}|]
////}
// TODO: GH#18445
verify.rangeAfterCodeFix(`{\r
        super();\r
    }`, /*includeWhitespace*/ true);
