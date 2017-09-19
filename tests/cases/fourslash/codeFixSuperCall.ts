/// <reference path='fourslash.ts' />

////class Base{
////}
////class C extends Base{
////    constructor() {[|
////    |]}
////}
// TODO: GH#18445
verify.rangeAfterCodeFix(`
        super();\r
    `, /*includeWhitespace*/ true);
