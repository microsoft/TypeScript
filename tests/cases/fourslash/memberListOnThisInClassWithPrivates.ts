/// <reference path='fourslash.ts'/>

////class C1 {
////   public pubMeth() {this./**/} // test on 'this.'
////   private privMeth() {}
////   public pubProp = 0;
////   private privProp = 0;
////}

goTo.marker();
verify.memberListContains('privMeth', '(method) C1.privMeth(): void');
verify.memberListContains('pubMeth', '(method) C1.pubMeth(): void');
verify.memberListContains('pubProp', '(property) C1.pubProp: number');