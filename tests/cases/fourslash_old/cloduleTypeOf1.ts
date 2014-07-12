/// <reference path='fourslash.ts'/>

////class C<T> {
////    static foo(x: number) { }
////    x: T;
////}
////
////module C {
////    export function f(x: typeof C) {
////        x./*1*/
////        var r/*3*/ = new /*2*/x<number>();
////        var r2/*5*/ = r./*4*/
////        return typeof r;
////    }
////}

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');


goTo.marker('1');
verify.completionListContains('f');
verify.completionListContains('foo');
edit.insert('foo(1);');

goTo.marker('2');
verify.completionListContains('x');

goTo.marker('3');
verify.quickInfoIs('C<number>');

goTo.marker('4');
verify.completionListContains('x');
edit.insert('x;');

goTo.marker('5');
verify.quickInfoIs('number');

verify.numberOfErrorsInCurrentFile(0);