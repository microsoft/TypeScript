/// <reference path='fourslash.ts'/>

////class C1 {
////   public pubMeth() {this./**/} // test on 'this.'
////   private privMeth() {}
////   public pubProp = 0;
////   private privProp = 0;
////}

goTo.marker();
verify.completionListContains('privMeth', '(method) C1.privMeth(): void');
verify.completionListContains('pubMeth', '(method) C1.pubMeth(): void');
verify.completionListContains('pubProp', '(property) C1.pubProp: number');