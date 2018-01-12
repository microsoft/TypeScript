/// <reference path="fourslash.ts" />
// @Filename: test.ts
//// interface A { a: A }
//// declare let a: A;
//// type Deep<T> = { [K in keyof T]: Deep<T[K]> }
//// declare function foo<T>(deep: Deep<T>): T;
//// const out = foo(a);
//// out./*1*/a
//// out.a./*2*/a
//// out.a.a./*3*/a

goTo.marker('1');
verify.completionListCount(1);
goTo.marker('2');
verify.completionListCount(1);
goTo.marker('3');
verify.completionListCount(1);
