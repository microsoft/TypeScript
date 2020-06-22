/// <reference path='fourslash.ts' />

// @strict: true

////interface Foo {
////    bar?:{
////        baz?: any;
////    }
////}
////declare let foo: Foo;
/////*a*/foo.bar ? foo.bar.baz : "whenFalse";/*b*/

// do not offer a refactor for ternary expression if type of baz is any
goTo.select("a", "b");
verify.not.refactorAvailable("Convert to optional chain expression");
