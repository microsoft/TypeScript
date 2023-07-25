/// <reference path='fourslash.ts'/>

// Tests that goToDefinition does not go to a function type; it goes to the value.

////const /*constDefinition*/c: () => void;
/////*constReference*/c();
////function test(/*cbDefinition*/cb: () => void) {
////    /*cbReference*/cb();
////}
////class C {
////    /*propDefinition*/prop: () => void;
////    m() {
////        this./*propReference*/prop();
////    }
////}

verify.baselineGetDefinitionAtPosition("constReference", "cbReference", "propReference");
