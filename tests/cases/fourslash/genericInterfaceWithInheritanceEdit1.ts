/// <reference path='fourslash.ts'/>

////interface ChainedObject<T> {
////    values(): ChainedArray<any>;
////    pairs(): ChainedArray<any[]>;
////    extend(...sources: any[]): ChainedObject<T>;
////
////    value(): T;
////}
////interface ChainedArray<T> extends ChainedObject<Array<T>> {
////
////    extend(...sources: any[]): ChainedArray<T>;
////}
//// /*1*/

verify.noErrors();
goTo.marker('1');
edit.insert(' ');
verify.noErrors();