/// <reference path='fourslash.ts'/>

////class C1 {
////   public pubMeth() {this./**/} // test on 'this.'
////   private privMeth() {}
////   public pubProp = 0;
////   private privProp = 0;
////}

goTo.marker();
verify.memberListContains('privMeth', '() => void');
verify.memberListContains('pubMeth', '() => void');
verify.memberListContains('pubProp', 'number');