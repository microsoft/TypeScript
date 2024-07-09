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
////var /**/x = b.foo2().foo(5).foo(); // 'x' is of type 'void'

verify.quickInfoAt("", "var x: void");
verify.noErrors();
