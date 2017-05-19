/// <reference path='fourslash.ts' />

////class Base{
////}
////class C extends Base{
////    constructor() {[|
////    |]}
////}
verify.rangeAfterCodeFix(`
        super();
    `, /*includeWhitespace*/ true);
