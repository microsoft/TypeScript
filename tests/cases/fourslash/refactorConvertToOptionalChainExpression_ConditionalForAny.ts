/// <reference path='fourslash.ts' />

// @strict: true

////interface Foo {
////    bar?:{
////        baz?: any;
////    }
////}
////declare let foo: Foo;
/////*a*/foo.bar ? foo.bar.baz : "whenFalse";/*b*/

// It is reasonable to offer a refactor when baz is of type any since implicit any in strict mode
// produces an error and those with strict mode off aren't getting null checks anyway.
goTo.select("a", "b");
verify.refactorAvailable("Convert to optional chain expression");
