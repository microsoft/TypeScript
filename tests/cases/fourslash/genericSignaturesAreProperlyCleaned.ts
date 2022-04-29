/// <reference path='fourslash.ts' />

////interface Int<T> {
////val<U>(f: (t: T) => U): Int<U>;
////}
////declare var v1: Int<string>;
////var v2: Int<number> = v1/*1*/;

verify.numberOfErrorsInCurrentFile(1);
goTo.marker('1');
edit.deleteAtCaret(';'.length);
verify.numberOfErrorsInCurrentFile(1);

