/// <reference path='fourslash.ts' />
////class Bar<T> {
////    public explicitThis(this: this) {
////        console.log(th/*1*/is);
////    }
////    public explicitClass(this: Bar<T>) {
////        console.log(thi/*2*/s);
////    }
////}

goTo.marker('1');
verify.quickInfoIs('this: this');
goTo.marker('2');
verify.quickInfoIs('this: Bar<T>');