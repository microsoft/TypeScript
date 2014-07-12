/// <reference path='fourslash.ts'/>

////interface A<T> {
////    foo(a: T): B<T>;
////    foo(): void ;
////    foo2(): B<number>;
////}
////interface B<T> extends A<T> {
////    bar(): void ;
////}
////var b: B<number>;
////var x/**/ = b.foo2().foo(5).foo(); // 'x' is of type 'void'

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker();
verify.quickInfoIs('void');
verify.numberOfErrorsInCurrentFile(0);
