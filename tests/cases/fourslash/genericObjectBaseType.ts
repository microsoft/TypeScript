/// <reference path='fourslash.ts' />

//// class C<T> {
////     constructor(){}
////     foo(a: T) {
////         return a.toString();
////     }
//// }
//// var x = new C<string>();
//// var y: string = x.foo("hi");
//// /*1*/

goTo.marker('1');
verify.noErrors();
