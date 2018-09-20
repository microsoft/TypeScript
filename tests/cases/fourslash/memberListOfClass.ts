/// <reference path='fourslash.ts'/>

////class C1 {
////   public pubMeth() { }
////   private privMeth() { }
////   public pubProp = 0;
////   private privProp = 0;
////}
////var f = new C1();
////f./**/

goTo.marker();
verify.completionListCount(2);
verify.completionListContains('pubMeth', '(method) C1.pubMeth(): void');
verify.completionListContains('pubProp', '(property) C1.pubProp: number');