/// <reference path='fourslash.ts'/>

////class A<T> { }
////class B<T> {/*B*/ }
////class C<T> { /*C*/constructor(val: T) { } }
////class D<T> { constructor(/*D*/val: T) { } }
////
////new /*Asig*/A<string>();
////new /*Bsig*/B("");
////new /*Csig*/C("");
////new /*Dsig*/D<string>();

var A = 'A';
var B = 'B';
var C = 'C';
var D = 'D'
goTo.marker(B);
edit.insert('constructor(val: T) { }');
goTo.marker('Asig');
verify.quickInfoIs("(constructor) A<string>(): A<string>");

goTo.marker('Bsig');
verify.quickInfoIs("(constructor) B<string>(val: string): B<string>");

goTo.marker('Csig'); 
verify.quickInfoIs("(constructor) C<string>(val: string): C<string>");

goTo.marker('Dsig');
verify.quickInfoIs("(constructor) D<T>(val: T): D<T>"); // Cannot resolve signature

goTo.marker(C);
edit.deleteAtCaret('constructor(val: T) { }'.length);
goTo.marker('Asig');
verify.quickInfoIs("(constructor) A<string>(): A<string>");

goTo.marker('Bsig');
verify.quickInfoIs("(constructor) B<string>(val: string): B<string>");

goTo.marker('Csig');
verify.quickInfoIs("(constructor) C<T>(): C<T>"); // Cannot resolve signature

goTo.marker('Dsig');
verify.quickInfoIs("(constructor) D<T>(val: T): D<T>"); // Cannot resolve signature

goTo.marker(D);
edit.deleteAtCaret("val: T".length);
goTo.marker('Asig');
verify.quickInfoIs("(constructor) A<string>(): A<string>");

goTo.marker('Bsig');
verify.quickInfoIs("(constructor) B<string>(val: string): B<string>");

goTo.marker('Csig');
verify.quickInfoIs("(constructor) C<T>(): C<T>"); // Cannot resolve signature

goTo.marker('Dsig');
verify.quickInfoIs("(constructor) D<string>(): D<string>");