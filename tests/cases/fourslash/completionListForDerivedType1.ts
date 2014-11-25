/// <reference path='fourslash.ts'/>

////interface IFoo {
////    bar(): IFoo;
////}
////interface IFoo2 extends IFoo {
////    bar2(): IFoo2;
////}
////var f: IFoo;
////var f2: IFoo2;
////f./*1*/ // completion here shows bar with return type is any
////f2./*2*/ // here bar has return type any, but bar2 is Foo2

goTo.marker('1');
verify.completionListContains('bar', '(method) IFoo.bar(): IFoo');
verify.not.completionListContains('bar2');
edit.insert('bar();'); // just to make the file valid before checking next completion location

goTo.marker('2');
verify.completionListContains('bar', '(method) IFoo.bar(): IFoo');
verify.completionListContains('bar2', '(method) IFoo2.bar2(): IFoo2');