/// <reference path='fourslash.ts'/>

////interface I<T> { }
////class C<T> {}
////var /*1*/i: I<any>;
////var /*2*/c: C<I>;

goTo.marker('1');
verify.quickInfoIs('(var) i: I<any>');
goTo.marker('2');
verify.quickInfoIs('(var) c: C<any>');
