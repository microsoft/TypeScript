/// <reference path='fourslash.ts'/>

////class C { x: string; }
////class D { x: string; y: string; }
////function foo<T, U extends T>(t: T, t2: U) { return null; }
////var r3 = foo(new C(), { x: '', z/*1*/

goTo.marker('1')
verify.not.completionListContains('z');
verify.not.completionListContains('x');