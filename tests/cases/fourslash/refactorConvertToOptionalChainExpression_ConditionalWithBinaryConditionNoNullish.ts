/// <reference path='fourslash.ts' />

// @strict: true

////interface Foo {
////    bar:{
////        baz: string | null;
////    }
////}
////declare let foo: Foo;
/////*a*/foo && foo.bar ? foo.bar.baz : "whenFalse";/*b*/

// Do not offer refactor when true condition can be null.
goTo.select("a", "b");
verify.not.refactorAvailable("Convert to optional chain expression")