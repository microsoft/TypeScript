/// <reference path='fourslash.ts'/>

//// class A {
////     foo: string;
//// }
//// class C extends A {
////     baz: string;
//// }
//// var xs /*1*/ = [(x: A) => { return x.foo; }, (x: C) => { return x.baz; }];
//// xs.forEach(y => y(new /*2*/A()));

verify.numberOfErrorsInCurrentFile(0);
goTo.marker('1');
edit.insert(': {}[]');
verify.numberOfErrorsInCurrentFile(1);
goTo.marker('2');
edit.deleteAtCaret(1);
edit.insert('C');
verify.numberOfErrorsInCurrentFile(1);