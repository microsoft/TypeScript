/// <reference path='fourslash.ts'/>

////class C {
////    static foo() {
////        var /*1*/r = this;
////    }
////    static get x() {
////        var /*2*/r = this;
////        return 1;
////    }
////}

verify.quickInfos({
    1: "(local var) r: typeof C",
    2: "(local var) r: typeof C"
});
