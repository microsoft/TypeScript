/// <reference path='fourslash.ts'/>

////class C<T> {
////   foo(x: T) { }
////}
////var x = new /*1*/C<any>();
////var y = C.proto/*2*/type;

verify.quickInfos({
    1: "constructor C<any>(): C<any>",
    2: "(property) C<T>.prototype: C<any>"
});
