/// <reference path="fourslash.ts" />

//// function f<x, x>() { }
//// function f2<X, X>(b: X): X { return null; }
//// class C<X> {
////     public f<x, x>() {}
//// f2<X>(b): X { return null; }
//// }
//// 
//// interface I<X, X> {
////     f<X/*addTypeParam*/>();
////     f2<X>(/*addParam*/a: X): X;
//// }
//// 

goTo.marker('addParam');

edit.insert(", X");

goTo.marker('addTypeParam');

edit.insert(", X");
