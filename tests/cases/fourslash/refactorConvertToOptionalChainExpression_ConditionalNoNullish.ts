/// <reference path='fourslash.ts' />

// @strict: true

////interface Foo {
////    bar?:{
////        baz?: string | null;
////    }
////}
////declare let foo: Foo;
/////*a*/foo.bar ? foo.bar.baz : "whenFalse";/*b*/

// do not offer a refactor for ternary expression if type of baz is nullish
goTo.select("a", "b");
verify.not.refactorAvailable("Convert to optional chain expression");
