/// <reference path='fourslash.ts' />

////class Base{
////}
////class C extends Base{
////    private a:number;
////    constructor() {[|
////        this.a = 12;
////        super();
////    |]}
////}
// TODO: GH#18445
verify.rangeAfterCodeFix(`
        super();
        this.a = 12;
    `, /*includeWhiteSpace*/ true);
