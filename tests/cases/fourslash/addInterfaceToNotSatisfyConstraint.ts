/// <reference path="fourslash.ts" />

//// interface A {
//// 	a: number;
//// }
//// /**/
//// interface C<T extends A> {
////     x: T;
//// }
//// 
//// var v2: C<B>; // should not work

goTo.marker();
edit.insert("interface B { b: string; }");
