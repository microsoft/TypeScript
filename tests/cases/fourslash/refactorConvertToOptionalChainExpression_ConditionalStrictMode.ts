/// <reference path='fourslash.ts' />

// @strict: true

////interface Foo {
////    bar?:{
////        baz: string;
////    }
////}
////declare let foo: Foo;
/////*a*/foo.bar ? foo.bar.baz : "whenFalse";/*b*/

// Offer the refactor for ternary expressions if type of baz is not null, unknown, or undefined
goTo.select("a", "b");
verify.refactorAvailable("Convert to optional chain expression");
