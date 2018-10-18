/// <reference path='fourslash.ts'/>

////export class List<T> {
////    public next: List<T>;
////    public prev: List<T>;
////    public pushEntry(entry: List<T>): void {
////        entry./*1*/
////    }
////}

goTo.marker('1');
verify.completionListContains('next');
verify.completionListContains('prev');
verify.completionListContains('pushEntry');
edit.insert('next.');
verify.completionListContains('next');
verify.completionListContains('prev');
verify.completionListContains('pushEntry');
edit.insert('prev.');
verify.completionListContains('next');
verify.completionListContains('prev');
verify.completionListContains('pushEntry');
