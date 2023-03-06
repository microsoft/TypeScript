///<reference path="fourslash.ts" />

//// class Foo<T> {
////     /**
////      * {@link Foo}
////      * {@link Foo<T>}
////      * {@link Foo<Array<X>>}
////      * {@link Foo<>}
////      * {@link Foo>}
////      * {@link Foo<}
////      */
////     bar/**/(){}
//// }

verify.noErrors()
verify.baselineQuickInfo();
