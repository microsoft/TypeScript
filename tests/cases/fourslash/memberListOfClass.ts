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
verify.memberListCount(2);
verify.memberListContains('pubMeth', '() => void');
verify.memberListContains('pubProp', 'number');