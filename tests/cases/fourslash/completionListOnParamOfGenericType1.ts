/// <reference path='fourslash.ts'/>

////export class List<T> {
////    public next: List<T>;
////    public prev: List<T>;
////    public pushEntry(entry: List<T>): void {
////        entry./*1*/
////    }
////}

goTo.marker('1');
verify.memberListContains('next');
verify.memberListContains('prev');
verify.memberListContains('pushEntry');
edit.insert('next.');
verify.memberListContains('next');
verify.memberListContains('prev');
verify.memberListContains('pushEntry');
edit.insert('prev.');
verify.memberListContains('next');
verify.memberListContains('prev');
verify.memberListContains('pushEntry');
