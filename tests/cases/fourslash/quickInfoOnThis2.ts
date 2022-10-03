/// <reference path='fourslash.ts' />
////class Bar<T> {
////    public explicitThis(this: this) {
////        console.log(th/*1*/is);
////    }
////    public explicitClass(this: Bar<T>) {
////        console.log(thi/*2*/s);
////    }
////}

verify.quickInfos({
    1: "this: this",
    2: "this: Bar<T>"
});
