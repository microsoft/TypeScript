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

goTo.marker('1');
verify.quickInfoIs('(local var) r: typeof C');

goTo.marker('2');
verify.quickInfoIs('(local var) r: typeof C');