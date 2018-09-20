/// <reference path='fourslash.ts'/>

////class TAB<T>{
////    foo<T>(x: T) {
////    }
////    bar(a: number, b: number) {
////    }
////}
////
////class TAD<T> extends TAB<T> {
////    constructor() {
////        super();
////    }
////    bar(f: number) {
////        super./**/
////    }
////}

goTo.marker();
verify.completionListContains('foo');
verify.completionListContains('bar');
verify.completionListCount(2);
