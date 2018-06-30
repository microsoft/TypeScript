/// <reference path='fourslash.ts' />

////class Base{
////}
////class C extends Base{
////    private a:number;
////    constructor() {[|
////        this.a = 12;
////        super();
////    |]}
////    m() { this.a; } // avoid unused 'a'
////}
verify.rangeAfterCodeFix(`
        super();
        this.a = 12;
    `, /*includeWhiteSpace*/ true);
